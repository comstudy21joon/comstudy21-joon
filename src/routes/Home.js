import { useState, useEffect } from 'react';
import { dbService, storageService } from 'fbase';
import Nweet from './Nweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState('');
  // const getNweets = async () => {
  //   // firestore db에서 데이터를 가져와서 출력.
  //   const dbNweets = await dbService.collection('nweets').get();
  //   let newList = [];
  //   dbNweets.forEach((doc) => {
  //     let data = doc.data();
  //     data.docId = doc.id;
  //     //{createAt: 1632968065368, text: 'Hello World', docId: 'Wx1VHQvMhzdooL2C52uj'}
  //     newList.push(data);
  //   });
  //   setNweets(newList);
  // };

  useEffect(() => {
    //getNweets();
    // firestore에서 데이터 변경이 일어나면 자동 갱신 하도록 한다.
    // onSnapshot 이벤트 핸들러 함수를 사용한다.
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((doc) => {
        return { docId: doc.id, ...doc.data() };
      });
      setNweets(newArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    // 1.파일을 stoarage에 upload하고
    // 2.그 URL을 firestore에 저장한다.
    // storage에 저장 할때는 UID가 자동 생성 되지 않게 설계되었다.
    // 먼저 uuid 모듈 설치 : uid 자동 생성기 (npm install uuid)
    // https://github.com/uuidjs/uuid/#readme
    //console.log(uuidv4());
    // 만들어질 디렉토리와 파일명을 미리 준비한다.
    let downloadUrl = '';
    if (attachment) {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const resp = await attachmentRef.putString(attachment, 'data_url');
      downloadUrl = await resp.ref.getDownloadURL();
    }

    // firestore는 MongoDB 구조와 같다.
    // firebase와 같은 nosql계통의  collection은 RDB의 table이다.
    // RDB에서 row === firebase의 Document (JS 객체)
    await dbService.collection('nweets').add({
      text: nweet,
      createAt: Date.now(),
      createId: userObj.uid,
      email: userObj.email,
      attachmentUrl: downloadUrl,
    });
    // db저장 후 input창 초기화
    setNweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    event.preventDefault();
    //setNweet(event.target.value);
    // event를 객체를 구조분해 하기
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    //console.dir(event.target.files[0]);
    const {
      target: { files },
    } = event;
    const reader = new FileReader();
    // 모두 읽어 들이면 후속 처리하기 (이벤트 핸들러)
    reader.onloadend = (progressEvent) => {
      //console.dir(progressEvent.currentTarget.result);
      const {
        currentTarget: { result },
      } = progressEvent;
      setAttachment(result);
    };
    // 로컬의 파일을 읽어 올때도 Ajax 사용처럼 비동기 처리 된다.
    reader.readAsDataURL(files[0]);
  };

  return (
    <div>
      <span>Home</span>
      <form onSubmit={onSubmit}>
        <input type="text" value={nweet} onChange={onChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <>
            <img src={attachment} height="50px" />
            <input
              type="button"
              value="제거"
              onClick={(event) => {
                setAttachment('');
              }}
            />
          </>
        )}
        <input type="file" accept="image/*" onChange={onFileChange} />
      </form>
      <div>
        {
          // 만들어진 nweets을 활용해서 목록을 만든다.
          nweets.map((nweet) => {
            return <Nweet key={nweet.docId} nweetObj={nweet} userObj={userObj} />;
          })
        }
      </div>
    </div>
  );
};

export default Home;
