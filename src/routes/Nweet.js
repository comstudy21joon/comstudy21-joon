import { dbService } from 'fbase';

const Nweet = ({ nweetObj, userObj }) => {
  const onDeleteClick = async (event) => {
    let ok = window.confirm('정말로 삭제 하시겠습니까?');
    if (ok) {
      console.log(nweetObj.docId);
      let data = await dbService.collection('nweets').doc(nweetObj.docId).delete();
      console.log(data);
    }
  };
  // 소년이노 학난성
  const textStyle = {
    color: 'orange',
    fontSize: '16pt',
  };
  return (
    <div>
      <span style={textStyle}>
        {nweetObj.text} ({nweetObj.email})
      </span>
      {userObj.uid === nweetObj.createId ? (
        <span>
          <button onClick={onDeleteClick}>Delete</button>
          <button>Edit</button>
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Nweet;
