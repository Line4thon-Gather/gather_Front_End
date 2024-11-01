import React from 'react';
import styles from '../../styles/creator/CheckModal.module.css';
import Image from '../../assets/images/ModalImage.png';
import CloseIcon from '../../assets/images/CloseIcon.png';

const CheckModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2 className={styles.Title}>크리에이터 등록하기</h2>
          <img
            src={CloseIcon}
            alt="닫기"
            className={styles.closeIcon}
            onClick={onCancel}
          />
        </div>
        <img className={styles.ImgModal} src={Image} alt="모달 이미지" />
        <p className={styles.mainAlert}>크리에이터 등록을 완료하시겠습니까?</p>
        <p className={styles.subAlert}>
          이후 마이페이지에서 수정하실 수 있습니다.
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={onCancel} className={styles.cancelButton}>
            취소하기
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
