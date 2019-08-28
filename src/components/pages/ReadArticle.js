/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayContent from 'Dante2';
import Rater from 'react-rater';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import jwt from 'jwt-decode';
import { Link, Redirect } from 'react-router-dom';
import { getArticle, deleteArticle, resetProps } from '../../redux/actions/article.actions';
import { getUserProfile } from '../../redux/actions/author/authoruser.action';
import { DEFAULT_AVATA } from '../../utils/constants';
import Preloader from '../widgets/Preloader';


class ReadArticle extends Component {
  state = {
    Article: {},
    Author: {},
    user: {},
    slug: '',
    redirect: false,
    isProfileRequested: false,
    editorState: null,
  };

  componentWillMount() {
    const { slug } = this.props.match.params;
    let user = {};
    this.props.getArticle(slug);
    if (sessionStorage.getItem('token')) {
      user = jwt(sessionStorage.getItem('token'));
    }
    this.setState({ user, slug });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.Article) {
      this.setState({ Article: newProps.Article });
      if (!this.state.isProfileRequested) {
        this.props.getUserProfile(newProps.Article.article.author.username);
        this.setState({ isProfileRequested: true });
      }
    }
    if (newProps.Author) {
      this.setState({ Author: newProps.Author });
    }
    if (newProps.Delete.message) {
      this.setState({ redirect: true });
      toast.success('Articles has been deleted successfully...');
    }
  }

  handleChange = (editorState) => {
    const { Article } = this.state;
    const content = JSON.parse(Article.article.body);
    const { blocks } = content.article.body;
    const contentBlocks = blocks.splice(1, blocks.length);
    // console.log(this.state.editorState ? 'state' : 'change');
    // console.log((this.state.editorState || editorState).getEditorState().getCurrentContent());
    this.setState(prevState => ({
      ...prevState,
      editorState: prevState.editorState || editorState,
    }));
    const { anchorOffset, focusOffset, anchorKey } = editorState.getEditorState().getSelection();
    contentBlocks.forEach(({ key, text }) => {
      if (anchorKey === key) {
        const start = Math.min(anchorOffset, focusOffset);
        const end = Math.max(anchorOffset, focusOffset);
        const highlightedText = text.substring(start, end);
        console.log(highlightedText);
      }
    });
    return false;
  }

  render() {
    const {
      Article,
      Author,
      user: { username },
      editorState,
    } = this.state;
    let contentBlocks = [];
    if (this.state.redirect) {
      return <Redirect to="/articles" />;
    }
    if (Article && Author.profile) {
      const content = JSON.parse(Article.article.body);
      const { blocks } = content.article.body;
      contentBlocks = blocks.splice(1, blocks.length);
      const { avatar, firstName, lastName } = Author.profile;
      return (
        <div className="container view-article-content mt-5">
          <section className="editor-main-section">
            <main className="editor-main row mt-6 mb-5">
              <div className="col-lg-9 left-nav">
                <div className="title-content">
                  <p>
                    <strong>{blocks[0].text}</strong>
                  </p>
                </div>
                <div className="row profile-content ml-1">
                  <div className="">
                    <Link to={`/profile/${this.state.Article.article.author.username}`}><img className="" src={avatar || DEFAULT_AVATA} alt="" /></Link>
                  </div>
                  <div className="ml-3">
                    <div>
                      <Link to={`/profile/${this.state.Article.article.author.username}`}><strong>{`${firstName}  ${lastName}`}</strong></Link>
                    </div>
                    <div>
                      <Moment format="D MMM YYYY">
                        {Article.article.createdAt}
                      </Moment>
                    </div>
                    <Rater total={5} rating={2} />
                  </div>
                </div>
                <div className="mt-3">
                  <DisplayContent
                    content={editorState || { blocks: contentBlocks, entityMap: {} }}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-1 rigth-nav text-center">
                <div className="social-buttons">
                  <div className="flauting-buttons mt-3 facebook">
                    <i className="fab fa-facebook-f" />
                  </div>
                  <div className="flauting-buttons mt-3 twitter">
                    <i className="fab fa-twitter" />
                  </div>
                  <div className="flauting-buttons mt-3 email">
                    <i className="fas fa-envelope-open" />
                  </div>
                  <div
                    className={`${
                      username === this.state.Article.article.author.username
                        ? 'hide-button'
                        : ''
                    } flauting-buttons mt-3 bookmark`}
                  >
                    <i className="far fa-bookmark" />
                  </div>
                  <div
                    className={`${
                      username === this.state.Article.article.author.username
                        ? 'hide-button'
                        : ''
                    } flauting-buttons mt-3`}
                  >
                    <i className="fas fa-thumbs-up" />
                  </div>
                  <div
                    className={`${
                      username === this.state.Article.article.author.username
                        ? 'hide-button'
                        : ''
                    } flauting-buttons mt-3 dislike`}
                  >
                    <i className="fas fa-thumbs-down" />
                  </div>
                  <Link to={`/article/${this.state.slug}/edit`}>
                    <div
                      className={`${
                        username !== this.state.Article.article.author.username
                          ? 'hide-button'
                          : ''
                      } flauting-buttons mt-3 edit`}
                    >
                      <i className="fas fa-edit" />
                    </div>
                  </Link>
                  <div
                    className={`${
                      username !== this.state.Article.article.author.username
                        ? 'hide-button'
                        : ''
                    } flauting-buttons mt-3 delete`}
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    <i className="fas fa-trash-alt" />
                  </div>
                </div>
              </div>
            </main>
            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header model-header-div">
                    <button type="button" className="close text-white" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body modal-body-div">
                    <p> Are you sure you want to delete this article ?</p>
                  </div>
                  <div className="modal-footer modal-footer-div">
                    <button type="button" className="btn btn-default text-white" data-dismiss="modal">No</button>
                    <button type="button" className="btn btn-default text-white" data-dismiss="modal" onClick={() => this.props.deleteArticle(this.state.slug)}>Yes</button>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      );
    }
    return (
      <div>
        <Preloader />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Article: state.article.article,
  Author: state.author.authorprofile,
  Delete: state.article.deletedArticle,
});

export default connect(
  mapStateToProps,
  {
    getArticle, getUserProfile, deleteArticle, resetProps,
  },
)(ReadArticle);
