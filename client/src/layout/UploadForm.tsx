import Router from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AuthLayout from '../components/auth/AuthLayout';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Modal from '../components/auth/Modal';
import { Button, Input, Select } from '../components/shared/shared';
import backUrl from '../config/config';
import { RootState } from '../reducers';
import { addImagesRequest, addPostRequest, removeImages } from '../reducers/post/post';

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const PlaceBtn = styled.button`
  /* display: flex; */
  width: 40%;
  margin-bottom: 20px;
  height: 30px;
`;

const Btn = styled.button`
  width: 40%;
  background-color: green;
  color: #fff;
  height: 30px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
const InputImg = styled.input`
  width: 100%;
  cursor: pointer;
  text-align: center;
  margin-bottom: 20px;
  border: 3px solid ${(props) => props.theme.borderColor};
  border-radius: 12px;
  height: 40px;
  color: #000;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const ImgForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
    margin: 20px 0;
    background-color: initial;
    height: 40px;
    border: 1px solid ${(props) => props.theme.borderDarkColor};
    border-radius: 10px;
    font-size: 18px;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
`;

const UploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const onModal = useCallback(() => {
    setModal((cur) => !cur);
  }, []);

  const [place, setPlace] = useState('');
  const dataPlace = useCallback((data) => {
    setPlace(data);
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const onFrontPage = useCallback(() => {
    if (pageNumber === 3) {
      setPageNumber((cur) => cur);
    }
    setModal(false);

    return setPageNumber((cur) => cur + 1);
  }, []);
  const onBackPage = useCallback(() => {
    if (pageNumber === 0) {
      setPageNumber((cur) => cur);
    }
    return setPageNumber((cur) => cur - 1);
  }, []);

  //   const onCurrentPage = useCallback(() => {}, []);

  const { imagePaths } = useSelector((state: RootState) => state.post);
  const imageInput: any = useRef();

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(removeImages(index));
    },
    [],
  );
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((event) => {
    // console.log('images', event.target.files);
    const imageFormData = new FormData();
    [].forEach.call(event.target.files, (f) => {
      imageFormData.append('image', f);
    });

    dispatch(addImagesRequest(imageFormData));
  }, []);

  const onSubmit = useCallback(() => {
    const { title, content, hashtag, activityName, searchName, kinds } = getValues();

    if (kinds === 'none') {
      return alert('종류를 선택해주세요!');
    }
    const formData = new FormData();
    imagePaths.forEach((img: any) => {
      formData.append('image', img);
    });
    formData.append('title', title);
    formData.append('content', content);
    formData.append('hashtag', hashtag);
    formData.append('kinds', kinds);
    formData.append('activityName', activityName);
    formData.append('searchName', place);
    dispatch(addPostRequest(formData));
    return Router.back();
  }, [getValues, imagePaths]);

  return (
    <AuthLayout>
      <FormBox>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {pageNumber === 0 && (
            <>
              <PlaceBtn type="button" onClick={onModal}>
                {modal ? '도로명 닫기' : '도로명 찾기'}
              </PlaceBtn>
              {modal && <Modal dataPlace={dataPlace} />}
              <label>도로명을 입력해주세요</label>
              <Input
                type="text"
                value={place}
                // disabled
                {...register('searchName', {
                  required: '주소를 작성해주세요',
                })}
              />
              <label>음식 이름 입력해주세요</label>
              <Input
                type="text"
                {...register('activityName', {
                  required: '음식 이름을 작성해주세요',
                })}
              />
            </>
          )}
          {pageNumber === 1 && (
            <>
              <label>제목</label>
              <Input
                type="text"
                id="title"
                {...register('title', {
                  required: '제목을 작성해주세요',
                })}
              />
              <FormError message={errors?.title?.message} />

              <label>내용</label>
              <Input
                type="text"
                id="content"
                {...register('content', {
                  required: '설명을 작성해주세요',
                })}
              />
              <FormError message={errors?.content?.message} />
            </>
          )}
          {pageNumber === 2 && (
            <>
              <label>해쉬태그</label>
              <Input type="text" id="hashtag" {...register('hashtag')} />
              <FormError message={errors?.hashtag?.message} />

              <label>카테고리</label>
              <Select id="kinds" {...register('kinds')}>
                <option value="none">선택하세요</option>
                <option value="양식">양식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="한식">한식</option>
              </Select>
            </>
          )}
          {pageNumber === 3 && (
            <>
              <InputImg type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
              <InputImg type="button" value="이미지 업로드" onClick={onClickImageUpload} accept="image/*" />

              <ImgForm className="uploadImg">
                {imagePaths.map((v: string, i: number) => (
                  <div key={v}>
                    <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt="img" />
                    <div>
                      <button type="button" onClick={onRemoveImage(i)}>
                        제거
                      </button>
                    </div>
                  </div>
                ))}
              </ImgForm>
            </>
          )}
          <BtnContainer>
            {pageNumber !== 0 && (
              <Btn type="button" onClick={onBackPage}>
                이전
              </Btn>
            )}
            {pageNumber !== 3 && (
              <Btn type="button" onClick={onFrontPage}>
                다음
              </Btn>
            )}
          </BtnContainer>
          {pageNumber === 3 && <Button type="submit" value="업로드" />}
        </form>
      </FormBox>
    </AuthLayout>
  );
};

export default UploadForm;
