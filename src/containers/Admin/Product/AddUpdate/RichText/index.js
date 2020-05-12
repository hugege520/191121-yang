import React, { Component } from 'react'
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
export default class RichText extends Component {
  state = {
    editorState: EditorState.createEmpty(),
   
  }
  //用于会写富文本
  getAnswerText=(html)=>{
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
      });
  }
}
  //用于获取效果文本对应的富文本
  getRichText=()=>{
    const { editorState } = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  //富文本更新时用于跟新state中editorState回调
  onEditorStateChange = (editorState) => {

    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          //wrapperClassName="demo-wrapper"
          editorStyle={{
            border:'1px solid black',
						paddingLeft:'10px',
						minHeight:'200px',
						lineHeight:'10px'
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    )
  }
}
