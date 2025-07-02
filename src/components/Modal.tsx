type Props = {
  onClose: () => void;
  onHandleConfirmDelete: () => void;
};

export const Modal = ({ onClose, onHandleConfirmDelete }: Props) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">確認</h3>
        <div className="p-4">
          <p>
            削除したメッセージはチャットの参加者全員から確認できなくなります。
          </p>
          <p>メッセージを削除しますか？</p>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            キャンセル
          </button>
          <button className="btn btn-error" onClick={onHandleConfirmDelete}>
            削除する
          </button>
        </div>
      </div>
    </div>
  );
};
