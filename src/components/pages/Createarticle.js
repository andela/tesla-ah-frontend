/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from 'prestein-dante';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import EditorState from '../widgets/Editorstate';
import {
  uploadImage,
  createArticle,
  updateArticle,
} from '../../redux/actions/article.actions';
import { getFromEditor } from '../../utils/getArticleItemData';

export class Createarticle extends Component {
  state = {
    images: [],
    redirect: false,
    slug: '',
    noImageUploaded: true,
    noArticleCreated: true,
  };

  componentWillReceiveProps(newProps) {
    const { NewUploadedImage, NewArticle } = newProps;
    const currentUploadImagePosition = Editor.getCurrentUploadImagePos();
    if (NewUploadedImage.secure_url) {
      const { images } = this.state;
      images.push({
        position: currentUploadImagePosition,
        url: NewUploadedImage.secure_url,
      });
      this.setState({ images });
    } else {
      this.setState({ noImageUploaded: true });
    }
    if (NewArticle.article) {
      const { slug } = NewArticle.article;
      toast.success('Article published successful');
      this.setState({ redirect: true, slug });
    } else {
      this.setState({ noArticleCreated: true });
    }
  }

  notifydeafault = (cantoast) => {
    if (cantoast) {
      toast(
        'Publishing will become available, when you have at least title and one paragraph',
        {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      );
    }
  }

  render() {
    const { slug } = this.state;
    if (this.state.redirect) {
      return <Redirect to={`/articles/${slug}`} />;
    }
    // console.log(this.state.isUpdating);
    return (
      <div className="container create-article-container mt-4">
        <Editor
          tags={[]}
          slug=""
          images={this.state.images}
          edtrState={EditorState}
          isUpdating={false}
          uploadImage={this.props.uploadImage}
          createArticle={this.props.createArticle}
          updateArticle={this.props.updateArticle}
          getFromEditor={getFromEditor}
          notifydeafault={this.notifydeafault}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  edtrState: PropTypes.instanceOf(Object).isRequired,
  updateArticle: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  NewUploadedImage: state.article.uploadedImage,
  NewArticle: state.article.currentArticle,
});

export default connect(
  mapStateToProps,
  { updateArticle, uploadImage, createArticle },
)(Createarticle);
