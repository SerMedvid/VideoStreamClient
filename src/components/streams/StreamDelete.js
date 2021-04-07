import React, {useEffect} from "react";
import Modal from "../Modal";
import history from "../../history";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteStream, fetchStream} from "../../actions";

const StreamDelete = ({match}) => {
  const streamId = match.params.id;
  const dispatch = useDispatch();
  const stream = useSelector(state => state?.streams[streamId]);

  useEffect(() => {
    dispatch(fetchStream(streamId));
  }, [streamId, dispatch]);

  const onDelete = () => {
    dispatch(deleteStream(streamId))
  }

  const renderActions = () => (
    <>
      <button
        className="ui negative button"
        onClick={onDelete}
      >
        Delete
      </button>
      <Link to="/" className="ui button">Cancel</Link>
    </>
  )

  return (
    <Modal
      title="Delete Stream"
      content={`Are you sure you want to delete ${stream ? stream.title : 'this stream'}?`}
      actions={renderActions()}
      onDismiss={() => history.push('/')}
    />
  )
}

export default StreamDelete;