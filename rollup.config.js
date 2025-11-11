import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-server';

const processArguments = process.argv;
let buildTarget = 'cdn' | 'nodePackage';
let devMode = false;

processArguments.forEach((arg) => {
  if (arg.includes('buildType=cdn')) {
    buildTarget = 'cdn';
  }

  if (arg.includes('mode=dev')) {
    devMode = true;
  }
});

const plugins = [
  nodeResolve(),
  commonjs({
    include: 'node_modules/**'
  }),
  typescript({
    tsconfig: './tsconfig.json'
  }),
  terser()
];

function config() {
  const configs = [];

  if (buildTarget === 'cdn') {
    // CDN build
    if (devMode) {
      plugins.push(
        serve({
          port: 9200,
          contentBase: ['dist']
        })
      );
    }

    configs.push({
      input: './src/cdn.ts',
      output: {
        file: 'dist/cdn.js',
        format: 'esm',
        sourcemap: false
      },
      plugins
    });
  } else {
    // Node package build - build both frontend and backend
    configs.push(
      // Frontend SDK
      {
        input: './src/index.ts',
        output: {
          file: 'dist/index.js',
          format: 'esm',
          sourcemap: false
        },
        plugins
      },
      // Backend SDK
      {
        input: './src/backend/index.ts',
        output: {
          file: 'dist/backend.js',
          format: 'esm',
          sourcemap: false
        },
        plugins,
        external: [] // No externals needed as fetch is built-in to Node 18+
      }
    );
  }

  return configs;
}

export default config;
