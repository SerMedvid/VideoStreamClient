import React, {useEffect} from "react";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {fetchStream, editStream} from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = ({match}) => {
  const streamId = match.params.id;
  const dispatch = useDispatch();
  const stream = useSelector(state => state?.streams[streamId]);

  useEffect(() => {
    dispatch(fetchStream(streamId));
  }, [streamId, dispatch])

  const onSubmit = formValues => {
    dispatch(editStream(streamId, formValues))
  }

  if (!stream) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={ _.pick(stream, 'title', 'description') }
        onSubmit={onSubmit} />
    </div>
  )
}

export default StreamEdit;