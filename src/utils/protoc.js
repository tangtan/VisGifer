// The data transformer for renderVisComp
export function transformData(pyJson) {
  console.log("pyJson", pyJson);
  let jsJson = {};
  jsJson.data = pyJson.data || null;
  jsJson.dataName = pyJson.name || null;
  jsJson.visualization = pyJson.vis_type || "barChart";
  jsJson.duration = pyJson.duration || 0;
  jsJson.enterDuration = pyJson.vis_duration || 1;
  jsJson.leaveDuration = pyJson.leave_duration || 0;
  jsJson.position = [pyJson.vis_position_x || 0, pyJson.vis_position_y || 0];
  jsJson.size = [pyJson.vis_size_w || 100, pyJson.vis_size_h || 100];
  jsJson.colors = pyJson.vis_colors || ["#cccccc"];
  jsJson.fontColor = pyJson.font_color || "ffffff";
  jsJson.fontSize = pyJson.font_size || 16;
  jsJson.backgroundFill = pyJson.background_fill || "white";
  jsJson.backgroundOpacity = pyJson.background_opacity || 0;
  jsJson.videoSrc = pyJson.background_src || null;
  jsJson.videoSize = [
    pyJson.background_size_w || 100,
    pyJson.background_size_h || 100
  ];
  console.log("jsJson", jsJson);
  return jsJson;
}
