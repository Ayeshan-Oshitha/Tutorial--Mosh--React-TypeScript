let count = 0;
function Message() {
  count++;
  return (
    <>
      <div>Message : {count}</div>
    </>
  );
}

export default Message;
