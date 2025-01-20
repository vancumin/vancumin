exports.main = async (event, context) => {
  const { fileList } = event; // fileList 是从客户端传递过来的数组
  try {
    const result = await uniCloud.deleteFile({
      fileList: fileList // fileList 是一个包含文件路径或文件ID的数组
    });
    return {
      success: true,
      result: result
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};