// 저장되어 있는 파일 조회 커스텀 훅
const UseFetchFile = async (post_id) => {
  console.log('Fetching Files ...')

  const response = await fetch(`http://localhost:5000/file/${post_id}`);
  const resData = await response.json();

  console.log(resData);
  return resData;
};

export default UseFetchFile;