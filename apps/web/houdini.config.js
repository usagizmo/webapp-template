/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
  plugins: {
    'houdini-svelte': {
      client: './src/client',
    },
  },
  scalars: {
    // ref: https://www.houdinigraphql.com/api/config#custom-scalars
    uuid: {
      type: 'string',
      unmarshal: (val) => val,
      marshal: (text) => text,
    },
    citext: {
      type: 'string',
      unmarshal: (val) => val,
      marshal: (text) => text,
    },
    timestamptz: {
      type: 'Date',
      unmarshal: (val) => new Date(val),
      marshal: (date) => date.getTime(),
    },
  },
};

export default config;
