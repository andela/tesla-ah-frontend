/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from 'prestein-dante';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import Preloader from '../widgets/Preloader';
import {
  getArticle,
  uploadImage,
  createArticle,
  updateArticle,
  resetProps,
} from '../../redux/actions/article.actions';
import { getFromEditor } from '../../utils/getArticleItemData';

export class Editarticle extends Component {
  state = {
    Article: {},
    slug: '',
    redirect: false,
    images: [],
  };

  componentWillMount() {
    const { slug } = this.props.match.params;
    this.setState({ slug });
    this.props.getArticle(slug);
  }

  componentWillReceiveProps(newProps) {
    const { NewUploadedImage, UpdateRes } = newProps;
    const currentUploadImagePosition = Editor.getCurrentUploadImagePos();
    if (newProps.Article) {
      this.setState({ Article: newProps.Article });
    }
    if (NewUploadedImage.secure_url) {
      toast.success('Image uploaded successfully');
      const { images } = this.state;
      images.push({
        position: currentUploadImagePosition,
        url: NewUploadedImage.secure_url,
      });
      this.setState({ images });
    }
    if (UpdateRes.message) {
      toast.success(newProps.UpdateRes.message);
      this.setState({ redirect: true });
      this.props.resetProps();
    }
  }

  render() {
    const { Article, slug } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/articles" />;
    }
    if (Article.status) {
      const content = JSON.parse(Article.article.body);
      const { blocks } = content.article.body;
      const tags = Article.article.tagList;
      return (
        <div className="container create-article-container mt-4">
          <Editor
            isUpdating
            tags={tags}
            slug={slug}
            images={this.state.images}
            edtrState={{ blocks, entityMap: {} }}
            uploadImage={this.props.uploadImage}
            createArticle={this.props.createArticle}
            updateArticle={this.props.updateArticle}
            getFromEditor={getFromEditor}
          />
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
  UpdateRes: state.article.updatedArticle,
  NewUploadedImage: state.article.uploadedImage,
});
export default connect(
  mapStateToProps,
  {
    getArticle, updateArticle, uploadImage, createArticle, resetProps,
  },
)(Editarticle);
