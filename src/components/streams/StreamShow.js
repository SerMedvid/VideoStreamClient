import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchStream} from "../../actions";

const StreamShow = ({match}) => {
  const streamId = match.params.id;
  const dispatch = useDispatch();
  const stream = useSelector(state => state?.streams[streamId]);

  useEffect(() => {
    dispatch(fetchStream(streamId));
  },[streamId, dispatch]);

  if (!stream) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  )
}

export default StreamShow;