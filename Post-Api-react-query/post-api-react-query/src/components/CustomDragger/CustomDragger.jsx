import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
const { Dragger } = Upload;

const CustomDragger = (props) => {
  const { customFunction = () => {} } = props;
  const [fileInfo, setFileInfo] = useState({
    name: "",
    url: null,
  });
  const customRequest = async (info) => {
    // console.log(info, "info");
    customFunction(info?.file);
    const basesixtyFourFile = await toBase64(info.file);
    setFileInfo({
      name: info?.file?.name,
      url: basesixtyFourFile,
    });
  };
  const draggerProps = {
    name: "customFile",
    multiple: false,
    isImageUrl: true,
    maxCount: 1,
    showUploadList: false,
    customRequest: customRequest,
    onDrop: customRequest,
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader?.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  return (
    <Dragger {...draggerProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        {fileInfo?.name ? fileInfo?.name : "Drag & Drop to Upload File"}
      </p>
      {fileInfo?.url && (
        <img
          src={fileInfo?.url}
          alt={fileInfo?.name}
          width={200}
          style={{ marginTop: 20 }}
        />
      )}
    </Dragger>
  );
};
export default CustomDragger;
