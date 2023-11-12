import {
  CanvasClient,
  ComponentDefinition,
  ComponentDefinitionParameter
} from '@uniformdev/canvas';
import fs from 'fs';
import * as prettier from 'prettier';
import { terminal } from 'terminal-kit';

require('dotenv').config();

const canvasClient = new CanvasClient({
  projectId: process.env.UNIFORM_PROJECT_ID,
  apiHost: process.env.UNIFORM_API_HOST || process.env.UNIFORM_CLI_BASE_URL,
  apiKey: process.env.UNIFORM_API_KEY,
  edgeApiHost: process.env.UNIFORM_EDGE_API_HOST || process.env.UNIFORM_CLI_BASE_EDGE_URL,
  bypassCache: true
});

const generateComponentName = (name: string) => {
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  return `${componentName}Component`;
};

type ParameterHandler = {
  supports: string[];
  type: string;
  render: (parameter: ComponentDefinitionParameter) => string;
};

const textParameterHandler: ParameterHandler = {
  supports: ['text', 'image', 'number'],
  type: 'string',
  render: (parameter) => {
    return `{${parameter.id}}`;
  }
};

const linkParameterHandler: ParameterHandler = {
  supports: ['link'],
  type: 'LinkParamValue',
  render: (parameter) => {
    return `<a href={${parameter.id}?.path ?? '#'}>Link Text</a>`;
  }
};

const assetParameterValue: ParameterHandler = {
  supports: ['asset'],
  type: `[{ url: string; }]`,
  render: (prettier) => {
    return `<img src={${prettier.id}?.[0]?.url} />`;
  }
};

const checkboxParameterHandler: ParameterHandler = {
  supports: ['checkbox'],
  type: 'boolean',
  render: (parameter) => {
    return `{${parameter.id}?.toString()}`;
  }
};

const supportedParameterHandlers: ParameterHandler[] = [
  textParameterHandler,
  linkParameterHandler,
  assetParameterValue,
  checkboxParameterHandler
];

const getRenderableParameters = (
  parameters: ComponentDefinitionParameter[]
): (ComponentDefinitionParameter & { handler: ParameterHandler })[] => {
  const handled = parameters.map((parameter) => {
    const handler = supportedParameterHandlers.find((handler) => {
      return handler.supports.includes(parameter.type);
    });

    return {
      ...parameter,
      handler
    };
  });

  return handled.filter((parameter) => {
    return !!parameter.handler;
  }) as any;
};

const generateComponentProps = async ({ definition }: { definition: ComponentDefinition }) => {
  const renderableParameters = getRenderableParameters(definition.parameters || []);
  const parameterMappings = renderableParameters?.map((parameter) => {
    return `  ${parameter.id}: ${parameter.handler.type};`;
  });

  const slotNames =
    definition.slots
      ?.map((slot) => {
        return `'${slot.id}'`;
      })
      .join(' | ') || 'string';

  const imports = "import { LinkParamValue } from '@uniformdev/canvas';";

  const parameters = `export type Parameters = {
  ${parameterMappings?.join('\n')}
}`;

  const slots = `export type Slots = ${slotNames};`;

  const fileContent = `${imports}\n\n${parameters}\n\n${slots}`;

  return prettier.format(fileContent, {
    parser: 'typescript'
  });
};

const generateComponentMapping = async ({ definition }: { definition: ComponentDefinition }) => {
  const componentName = generateComponentName(definition.id);
  const imports = `import { ResolveComponentResultWithType } from "uniform/models";
    import { ${componentName} } from './index';
  `;
  const def = `export const ${definition.id}Mapping : ResolveComponentResultWithType = {
    type: '${definition.id}',
    component: ${componentName},
  }`;

  const fileContent = `${imports}\n\n${def}`;

  return prettier.format(fileContent, {
    parser: 'typescript'
  });
};

const generateReactComponentStub = async ({ definition }: { definition: ComponentDefinition }) => {
  const renderableParameters = getRenderableParameters(definition.parameters || []);
  const componentName = generateComponentName(definition.id);
  const fileContent = `import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
  import { Parameters, Slots } from './props';

  export const ${componentName} = ({
    component,
    context,
    ${renderableParameters
      ?.map((parameter) => {
        return `${parameter.id},`;
      })
      .join('\n')}
  }: ComponentProps<Parameters, Slots>) => {
    return (
      <div>
        <h1 className="text-xl font-medium">${componentName}</h1>
        <p><strong>type/public id</strong>: {component.type}</p>
        <strong>props:</strong>
        <ul className="space-y-1 list-disc list-inside">
        ${renderableParameters
          ?.map((parameter) => {
            return `<li><strong>${parameter.id}:</strong> ${parameter.handler.render(
              parameter
            )}</li>`;
          })
          .join('\n')}
  </ul>
      </div>
    )
  }

  `;

  return prettier.format(fileContent, {
    parser: 'typescript'
  });
};

const mappingFileHandler: FileHandler = {
  path: ({ definition }) => {
    return process.cwd() + '/components/uniform/' + definition!.id.toLowerCase() + '/mapping.ts';
  },
  write: async ({ definition, path }) => {
    const content = await generateComponentMapping({
      definition
    });

    fs.writeFileSync(path, content);
  },
  promptToOverwrite: true
};

type FileHandler = {
  path: (props: { definition: ComponentDefinition }) => string;
  write: (props: { path: string; definition: ComponentDefinition }) => Promise<void>;
  promptToOverwrite: boolean;
};

const propsFileHandler: FileHandler = {
  path: ({ definition }) => {
    return process.cwd() + '/components/uniform/' + definition!.id.toLowerCase() + '/props.ts';
  },
  write: async ({ definition, path }) => {
    const props = await generateComponentProps({
      definition
    });

    fs.writeFileSync(path, props);
  },
  promptToOverwrite: false
};

const componentFileHandler: FileHandler = {
  path: ({ definition }) => {
    return process.cwd() + '/components/uniform/' + definition!.id.toLowerCase() + '/index.tsx';
  },
  write: async ({ definition, path }) => {
    const component = await generateReactComponentStub({
      definition
    });

    fs.writeFileSync(path, component);
  },
  promptToOverwrite: true
};

const reigstryFileHandler: FileHandler = {
  path: () => {
    return process.cwd() + '/uniform/mappings.ts';
  },
  promptToOverwrite: true,
  write: async ({ definition, path }) => {
    let fileContent = fs.readFileSync(path, 'utf8');

    if (!fileContent) {
      fileContent = '';
    }

    if (!fileContent.includes(`${definition.id}Mapping`)) {
      fileContent += `export { ${
        definition.id
      }Mapping } from '../components/uniform/${definition.id.toLocaleLowerCase()}/mapping';\n`;
    }

    fs.writeFileSync(path, fileContent);
  }
};

const askToOverwrite = (question: string): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    terminal(`${question} [Y|n]\n`);

    terminal.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, async function (_error, result) {
      resolve(result);
    });
  });
};

(async () => {
  terminal.cyan('Uniform RSC Scaffolder\n');

  const spinner = await terminal.spinner('asciiSpinner');
  terminal(' Loading Component Definitions ... \n');

  const { componentDefinitions: definitions } = await canvasClient.getComponentDefinitions();

  spinner.animate(false);

  const items = definitions.map((definition) => {
    return definition.name;
  });

  terminal.singleColumnMenu(items, async function (error, response) {
    const selected = definitions[response.selectedIndex];

    const targetFolder = process.cwd() + '/components/uniform/' + selected!.id.toLowerCase();

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    const steps: FileHandler[] = [
      propsFileHandler,
      componentFileHandler,
      mappingFileHandler,
      reigstryFileHandler
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]!;

      const path = step.path({
        definition: selected!
      });

      let write: boolean = true;

      if (step.promptToOverwrite && fs.existsSync(path)) {
        write = await askToOverwrite(
          `File ${path} already exists, would you like to overwrite it?`
        );
      }

      if (write) {
        await step.write({
          path,
          definition: selected!
        });
      }
    }

    terminal('\n').eraseLineAfter.green('👋');

    process.exit(0);
  });
})();
