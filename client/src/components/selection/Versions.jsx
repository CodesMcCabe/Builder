import React, { Component } from 'react';
import apiQuery from '../../utils/apiQuery';
import findSCG from '../../queries/stageContainerGroup/find';
import { Link } from 'react-router-dom';
import SelectLayout from './SelectLayout';
import './Versions.scss';

class Versions extends Component {
  state = {
    stageContainerGroup: null
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    apiQuery(findSCG, { id }).then(({ stageContainerGroup }) => {
      this.setState({ stageContainerGroup });
    });
  }
  render() {
    const { stageContainerGroup } = this.state;
    if(!stageContainerGroup) return null;
    const { stageContainers } = stageContainerGroup;
    return (
      <SelectLayout>
        <div className="versions">
          {stageContainers.map(({ version, id }) => (
            <Link to={`/${id}`}>
              <div className="version">
                { version }
              </div>
            </Link>
          ))}
        </div>
      </SelectLayout>
    )
  }
}

export default Versions;
