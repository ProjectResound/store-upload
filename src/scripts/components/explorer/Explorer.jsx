import React from 'react';
import Pagination from 'react-js-pagination';
import resoundAPI from '../../services/resound-api';
import ExplorerStore from './explorer-store';
import ExplorerActions from './explorer-actions';
import AudioItem from './AudioItem';
import ErrorsActions from '../errors/errors-actions';

const getStateFromStore = () => ExplorerStore.parseAudioList();
const getTransitionStateFromStore = () => ExplorerStore.getTransitionState();

export default class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioList: [],
      isAppending: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ExplorerStore.addChangeListener(this.onChange);
    resoundAPI.get()
      .then(audioList => ExplorerActions.parseAudioList(audioList))
      .catch((err) => {
        ErrorsActions.error(err);
      });
  }

  componentWillUnmount() {
    ExplorerStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      audioList: getStateFromStore(),
      isAppending: getTransitionStateFromStore(),
    });
  }

  handlePageChange(e) {
    resoundAPI.getPage(e)
      .then(audioList => ExplorerActions.parseAudioList(audioList))
      .catch((err) => {
        ErrorsActions.error(err);
      });
  }

  render() {
    if (!this.props) {
      return null;
    }
    const audioList = this.state.audioList;

    return (
      <div className="explorer col s9">
        <div className="explorer__table col s12">
          <div className="row">
            <div className="col s12">
              { audioList.totalCount &&
                <Pagination
                  activePage={audioList.currentPage}
                  itemsCountPerPage={audioList.perPage}
                  totalItemsCount={audioList.totalCount}
                  pageRangeDisplayed={10}
                  onChange={this.handlePageChange}
                  prevPageText="prev"
                  firstPageText="first"
                  lastPageText="last"
                  nextPageText="next"
                />
              }
            </div>
          </div>
          <div className="row">
            <div className="explorer__table-header col s3">Title</div>
            <div className="explorer__table-header col s3">File Name</div>
            <div className="explorer__table-header col s3">Date</div>
            <div className="explorer__table-header col s3">Length</div>
          </div>
          {audioList.audios && audioList.audios.map((audioItem, index) => (
            <AudioItem
              index={index}
              isAppending={this.state.isAppending}
              key={audioItem.filename + audioItem.updated_at}
              audioItem={audioItem}
            />
          ))}
          { !audioList.totalCount &&
            <div className="explorer__loading">
              loading audio files
            </div>
          }
        </div>
        <img src="/assets/images/mascot.png" width="100%" className="explorer__mascot" />
      </div>
    );
  }
}

