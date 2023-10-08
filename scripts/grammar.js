import cssProperties from './css-properties.js'

export const patterns = [
  {
    name: 'comment.line.double-slash',
    match: '//.*',
  },
  {
    name: 'comment.block',
    begin: '/\\*',
    end: '\\*/',
  },
  {
    include: '#tokens_block',
  },
  {
    include: '#component_block',
  },
  {
    include: '#story_block',
  },
]

export const repositories = {

  tokens_block: {
    patterns: [
      {
        name: 'keyword',
        begin: '^tokens\\b',
        end: '}',
        patterns: [
          {
            name: 'entity.other.attribute-name',
            match: '([a-z|A-Z|0-9]+)(?=\\s*{)'
          },
          {
            name: 'invalid',
            match: 'howdy'
          },
          {
            include: '#token_properties'
          },
          {
            begin: '\\b([a-z|A-Z|0-9]+)(?=\\s*{)',
            end: '}',
            patterns: [
              {
                include: '#token_properties'
              }
            ]
          }
        ]
      }
    ]
  },
  token_properties: {
    patterns: [
      {
        name: 'punctuation',
        match: ':'
      },

      {
        name: 'variable.parameter',
        match: '\\b[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9](?=\\s*:)'
      },
      {
        include: '#style_values'
      }
    ]
  },

  story_block: {
    patterns: [
      {
        name: 'keyword',
        begin: '^story\\b',
        end: '}',
        patterns: [
          {
            name: 'entity.other.attribute-name',
            match: '(?<=story)(\\s+)(.*)(?=\\s*{)'
          },
          {
            name: 'invalid',
            match: 'howdy'
          },
          {
            name: 'keyword',
            begin: '^\\s*frame\\b',
            end: '}',
            patterns: [
              {
                include: '#frame_block'
              }
            ]
          }
        ]
      }
    ]
  },
  frame_block: {
    patterns: [
      {
        name: 'entity.other.attribute-name',
        begin: '(?<=frame)(\\s+)(.*)(?=\\s*{)',
        end: '}',
        patterns: [
          {
            include: '#frame_properties'
          }
        ]
      }
    ]
  },
  frame_properties: {
    patterns: [
      {
        name: 'variable.parameter',
        match: '\\b[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9](?=\\s*:)'
      },
      {
        name: 'punctuation',
        match: ':'
      },
      {
        include: '#style_values'
      },
      {
        include: '#frame_block'
      }
    ]
  },

  component_block: {
    patterns: [
      {
        name: 'keyword',
        begin: '^component\\b',
        end: '\\}',
        patterns: [
          {
            begin: '^\\s*(style)\\s*([a-z|A-Z|0-9|_-]+)\\s*(when)?\\s*(\\$[a-z|A-Z|0-9|_-]+)?',
            end: '\\}',
            captures: {
              '1': { name: 'keyword' },
              '2': { name: 'entity.other.attribute-name' },
              '3': { name: 'keyword.control.conditional' },
              '4': { name: 'variable.parameter' }
            },
            patterns: [
              {
                include: '#conditional_style_block'
              },
              {
                include: '#component_style_block'
              }
            ]
          },
          {
            name: 'entity.other.attribute-name',
            match: '([a-z|A-Z|0-9|_-]+)(?=\\s*{)'
          },
          {
            name: 'keyword',
            begin: '^\\s*elements\\b',
            end: '\\}',
            patterns: [
              {
                include: '#elements_block'
              }
            ]
          },
          {
            include: '#variants_block'
          }
        ]
      }
    ]
  },
  elements_block: {
    patterns: [
      {
        begin: '^\\s*(shape|image|video|text|any|svg)\\s+([a-z|A-Z|0-9|_-]+)',
        captures: {
          '1': { name: 'support.type' },
          '2': { name: 'entity.other.attribute-name' }
        },
        end: '}',
        patterns: [
          {
            include: '#element_definition'
          }
        ]
      }
    ]
  },
  element_definition: {
    patterns: [
      {
        match: '^\\s*(shape|image|video|text|any|svg)\\s+([a-z|A-Z|0-9|_-]+)',
        captures: {
            '1': { name: 'support.type' },
            '2': { name: 'entity.other.attribute-name' }
        }
      },
      {
        include: '#elements_block'
      }
    ]
  },
  variants_block: {
    patterns: [
      {
        name: 'keyword',
        begin: '^\\s*(variants)\\b',
        end: '\\}',
        patterns: [
          {
            include: '#style_types'
          },
          {
            name: 'variable.parameter',
            match: '\\b[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9](?=\\s*:)'
          },
          {
            include: '#style_values'
          }
        ]
      }
    ]
  },
  component_style_block: {
    patterns: [
      {
        include: '#style_properties'
      },
      {
        include: '#style_values'
      }
    ]
  },
  conditional_style_block: {
    patterns: [
      {
        begin: '^\\s*(is)\\s*(\\w+)',
        end: '\\}',
        captures: {
          '1': { name: 'keyword.control' },
          '2': { name: 'string.other' }
        },
        patterns: [
          {
            include: '#component_style_block'
          }
        ]
      }
    ]
  },

  style_types: {
    patterns: [
      {
        name: 'support.type',
        match: '^\\s*(color|text|asset|dimension|toggle|switch)\\b'
      }
    ]
  },
  style_properties: {
    patterns: [
      {
        name: 'support.type.property-name.css',
        match: `(${cssProperties.join('|')})(?=\\s*:)`
      }
    ]
  },
  style_values: {
    patterns: [
      {
        begin: '(?<=: +)(\\w+(\\*)?)(\\s*)?(?=,)',
        end: '(\\n)',
        beginCaptures: {
            '1': { name: 'string.other' },
            '2': { name: 'entity' }
        },
        patterns: [
          {
              match: '\\s*(,)\\s*(\\w+(\\*)?)',
              captures: {
                  '1': { name: 'markup.punctuation.list.beginning' },
                  '2': { name: 'string.other' },
                  '3': { name: 'entity.name.function' }
              }
          }
        ]
      },
      {
        name: 'meta.property-value',
        match: '(?<=: +)\\$[a-zA-Z_][a-zA-Z0-9_-]*'
      },
      {
        name: 'string.unquoted.other',
        comment: 'absolute path for an asset file',
        match: '/[\\w\\s\\.-]+(/[\\w\\s\\.-]+)*'
      },
      {
        name: 'constant.numeric',
        comment: 'any dimension',
        match: '\\d+(\\.\\d+)?(px|em|rem|%|vw|vh|vmin|vmax|cm|mm|in|pt|pc)'
      },
      {
        name: 'constant.numeric',
        comment: 'hex colors',
        match: '#[0-9a-fA-F]{3,4}([0-9a-fA-F]{2}){0,2}'
      },
      {
        name: 'constant.numeric',
        comment: 'any number',
        match: '\\d+(\\.\\d+)?'
      },
      {
        name: 'constant.numeric',
        comment: 'rgb colors',
        match: 'rgb\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*\\)|rgba\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*(?:1|0(?:\\.\\d+)?)\\s*\\)'
      },
      {
        name: 'constant.numeric',
        match: 'hsla?\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%\\s*,\\s*\\d{1,3}%\\s*(,\\s*(?:\\d+(?:\\.\\d+)?|\\.\\d+)(%?)\\s*)?\\)'
      },
      {
        name: 'keyword.operator',
        comment: 'catch-all for text',
        match: '(?<=toggle\\s+[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]\\s*:\\s*)(on|off)'
      },
      {
        name: 'string.quoted.double',
        comment: 'catch-all for text',
        match: '(?<=text\\s+[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]\\s*:\\s*).+$'
      }
    ]
  }

}