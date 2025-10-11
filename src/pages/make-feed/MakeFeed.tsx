import { useEffect, useState, useRef, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";

import { useUserInfo } from "../../stores/userStore";
import { useMakeFeedMutation } from "../../hooks/useMakeFeed";
import { useGetApartCommunityFeed } from "../../hooks/useApartCommunityFeed";

import InputField from "../../components/common/input-field/InputField";
import Header from "../../layouts/Header";
import { FeedDetailPost } from "../../model/BaseFeedDetailModel";

import styles from './MakeFeed.module.scss';
import Spinners from "../../components/common/spinners/Spinners";

import PictureExample from "../../assets/PictureExample.svg"
import deleteIcon from "../../assets/Icon/DeleteIcon.svg"

const MAX_IMAGES = 10;

const FeedHeader = ({useMakeFeed, feedID}:{useMakeFeed:Function; feedID:string|null}) => {
  console.log(feedID);

  return(
      <div>
        <Header title={'글쓰기'} hasBackButton={true}
                onClickHeader={() => {useMakeFeed();}}
                hasIcons={<>등록</>}/>
      </div>
    )
}

const BodyData = ({feedData, setImages, setDeleteImage}:{feedData:FeedDetailPost; setImages:Dispatch<SetStateAction<File[]>>; setDeleteImage:Dispatch<SetStateAction<string[]>>;}) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContents] = useState<string>('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    setTitle(feedData.title);
    setContents(feedData.contents);

    feedData.s3ObjectResponseDtoList.forEach(url => {
      setPreviewUrls(prev => [...prev, url.fullUrl]);
    })

  }, [feedData.title, feedData.contents]);
  
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    feedData.title = e.target.value;
  };

  const contentChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setContents(e.target.value);
    feedData.contents = e.target.value;
  }

  const handleButtonClick = () => {
    // 숨겨진 input을 클릭
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalImages = previewUrls.length + newFiles.length;

    // 최대 이미지 개수(10개) 초과 시 알림
    if (totalImages > MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있습니다.`);
      return;
    }

    // 새로운 파일들을 읽어서 미리보기 URL 생성
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);

      setImages(prev => [...prev, file]);
    });
  };

  const handleImageDelete = (indexToDelete: number) => {
    if(previewUrls[indexToDelete].includes('https://s3'))
    {
      feedData.s3ObjectResponseDtoList.forEach(url => {
        if(url.fullUrl === previewUrls[indexToDelete])
          setDeleteImage(prev => [...prev, url.url]);
      })
    }
    setPreviewUrls(prev => prev.filter((_, index) => index !== indexToDelete));
    setImages(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  
  return(
    <>
      <div>
        <InputField
          label="제목"
          placeholder="제목을 입력해주세요."
          className=""
          type="text"
          name="makefeed-title"
          value={title}
          onChange={titleChange}
        />
        <textarea placeholder="내용을 입력해주세요."
                value={content} onChange={contentChange}
                style={{resize:'none', width:'100%', height:'292px', padding:'15px 12px', verticalAlign:'top', textAlign:'left', lineHeight:'normal'}}/>
        
        <div style={{padding:'20px 0px'}}>
          <input
            type="file" multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }} // input 태그 숨기기
          />
          <p style={{fontSize:'16px', fontWeight:'600'}}>사진첨부</p>
          <div style={{display:'flex', overflow:'auto', padding:'12px 0px'}}>
            {
              previewUrls.length < 10 ?
              <button onClick={handleButtonClick} style={{marginRight:'12px'}}>
                <img src={PictureExample}/>
              </button>
              :
              <></>
            }
            {
              previewUrls.length > 0 ?
              previewUrls.map((url, index) => (
                <div key={index} style={{position: 'relative', marginRight:'12px'}}>
                  <img 
                    src={url} 
                    alt={`미리보기 ${index + 1}`} 
                    style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius:'4px'}}
                  />
                  <button
                      onClick={() => handleImageDelete(index)}
                      style={{
                        position: 'absolute',
                        top: '0px', right: '0px',
                        width: '70px', 
                        height: '70px',
                        padding: '0',
                        background:'rgba(0, 0, 0, 0.1)',
                        border: 'none',
                        borderRadius:'4px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}><img src={deleteIcon} style={{position: 'absolute', top: '8px', right: '8px', width:'10px'}}/></button>
                </div>
              ))
            :
              <div style={{alignContent:"end"}}>
                <p style={{fontSize:'13px', color:'#767676'}}>390 * 460</p>
                <p style={{fontSize:'13px', color:'#767676'}}>최대 10장의 이미지 첨부가 가능합니다.</p>
              </div>
            }
          </div>
        </div>
      </div>
    </>
    )
}


const MakeFeed = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const [feedApartID, setFeedApartID] = useState<string|null>(localStorage.getItem("apartmentId"));
  const [feedID, setFeedID] = useState<string|null>(localStorage.getItem("changeFeed"));
  const [feedData, setFeedData] = useState<FeedDetailPost>( new FeedDetailPost(null));
  const [images, setImages] = useState<File[]>([]);
  const [deleteImage, setDeleteImage] = useState<string[]>([]);
  const { useMakeFeed, isPending }= useMakeFeedMutation({appartID: feedApartID, feedData:feedData, images:images, deleteImage:deleteImage, feedid:feedID});
  const {getApartCommunityFeedMutation, isPending : getIsPending} = useGetApartCommunityFeed({feedID:feedID, setPost:setFeedData});

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }
    setFeedID(localStorage.getItem("changeFeed"));
    if(feedID)
    {
      getApartCommunityFeedMutation();
    }
    else{
      setFeedData(new FeedDetailPost(null));
    }
  }, []);

  return (
    <>
      {
        isPending || getIsPending?
        <>
          <div className={[styles.register, styles.dimmed].join(" ")}>
            <Spinners />
          </div>
        </>
        :
        <></>
      }
      <FeedHeader useMakeFeed={useMakeFeed} feedID={feedID}/>
      <BodyData feedData={feedData} setImages={setImages} setDeleteImage={setDeleteImage}/>
    </>
  );
};

export default MakeFeed;