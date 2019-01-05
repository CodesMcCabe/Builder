const destroyStage = require('./stage/destroy');
const createStage = require('./stage/create');
const modifyStage = require('./stage/modify');
const txWrapper = require('./txWrapper');
const { StageType } = require('../models');
const {
  GraphQLList,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLInt,
} = require('graphql');

const ProjectSkeletonInputType = new GraphQLInputObjectType({
  name: 'ProjectSkeletonInput',
  description: 'Project Skeletons',
  fields: {
    id: { type: GraphQLString },
    ghNodeId: { type: GraphQLString },
    ghRepoId: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString },
    zipName: { type: GraphQLString },
  }
});

const stageArgs = {
  id: { type: GraphQLString },
  type: { type: GraphQLString },
  containerId: { type: GraphQLString },
  projectSkeletons: { type: new GraphQLList(ProjectSkeletonInputType) },
  codeFileIds: { type: new GraphQLList(GraphQLString) },
  language: { type: GraphQLString },
  testFramework: { type: GraphQLString },
  languageVersion: { type: GraphQLString },
  title: { type: GraphQLString },
  abiValidations: { type: GraphQLString },
  task: { type: GraphQLString },
  details: { type: GraphQLString },
  position: { type: GraphQLInt },
}

const creationArgs = {
  ...stageArgs,
  template: { type: GraphQLString },
}

module.exports = {
  destroyStage: {
    type: StageType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (_, { id }) => txWrapper(destroyStage)(id),
  },
  createStage: {
    type: StageType,
    args: creationArgs,
    resolve: (_, props) => txWrapper(createStage)(props),
  },
  modifyStage: {
    type: StageType,
    args: stageArgs,
    resolve: (_, props) => txWrapper(modifyStage)(props),
  },
}
