import { dbService, storageService } from 'fbase';
import { useState } from 'react';

const Nweet = ({ nweetObj, userObj }) => {
  // usetState() 함수로 만든 객체를 구조분해 한다.
  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(nweetObj.text);

  const onDeleteClick = async (event) => {
    let ok = window.confirm('정말로 삭제 하시겠습니까?');
    if (ok) {
      await dbService.collection('nweets').doc(nweetObj.docId).delete();
      if (nweetObj.attachmentUrl !== '') {
        // 삭제 시 storage 데이터 삭제
        await storageService.refFromURL(nweetObj.attachmentUrl).delete();
      }
    }
  };
  // 소년이노 학난성
  const textStyle = {
    color: 'orange',
    fontSize: '16pt',
  };
  return (
    <div>
      {isEdit ? (
        <span>
          <input
            type="text"
            value={newText}
            onChange={(event) => {
              setNewText(event.target.value);
            }}
          />
          <input
            type="button"
            value="OK"
            onClick={async (event) => {
              await dbService.collection('nweets').doc(nweetObj.docId).update({
                text: newText,
              });

              setIsEdit(false);
            }}
          />
        </span>
      ) : (
        <span style={textStyle}>
          {nweetObj.text} <img src={nweetObj.attachmentUrl} height="50px" /> ({nweetObj.email})
        </span>
      )}

      {userObj.uid === nweetObj.createId ? (
        <span>
          <button onClick={onDeleteClick}>Delete</button>
          <button
            onClick={(event) => {
              // 수정버튼을 누르면 ... text가 input창으로 변경
              setIsEdit(!isEdit);
              // let newText = window.prompt('Please enter your name:', 'Harry Potter');
              // dbService.collection('nweets').doc(nweetObj.docId).update({
              //   text: newText,
              // });
            }}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </button>
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Nweet;
