export default `
query findStageContainer($id: String) {
  stageContainer(id: $id) {
    id
    version
    type
    intro
    stageContainerGroup {
      id
      containerType
      description
      title
  	}
    stages {
      id
      title
      details
      codeFileIds
      task
      language
      languageVersion
      abiValidations
      solutions {
        id
        codeFileId
        stageId
        code
      }
      codeFiles {
        id
        name
        executable
        executablePath
        fileLocation
        hasProgress
        mode
        readOnly
        testFixture
        visible
        initialCode
        codeStageIds
      }
    }
	}
}
`