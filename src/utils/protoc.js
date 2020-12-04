// The data transformer for renderVisComp
export function transformData(pyJson) {
  console.log("pyJson", pyJson);
  let jsJson = {};
  jsJson.data = pyJson.data || null;
  jsJson.data_name = pyJson.name || null;
  jsJson.visualization = pyJson.vis_type || "barChart";
  jsJson.duration = pyJson.duration || 0;
  jsJson.enter_duration = pyJson.vis_duration || 1;
  jsJson.leave_duration = pyJson.leave_duration || 0;
  jsJson.position = [pyJson.vis_position_x || 0, pyJson.vis_position_y || 0];
  jsJson.size = [pyJson.vis_size_w || 100, pyJson.vis_size_h || 100];
  jsJson.color = pyJson.vis_colors || ["#cccccc"];
  jsJson.font_color = pyJson.font_color || "ffffff";
  jsJson.font_size = pyJson.font_size || 16;
  jsJson.background_fill = pyJson.background_fill || "white";
  jsJson.background_stroke = pyJson.background_stroke || "black";
  jsJson.background_opacity = pyJson.background_opacity || 0;
  jsJson.background_stroke_opacity = pyJson.background_stroke_opacity || 0;
  jsJson.background_line_width = pyJson.background_line_width || 0;
  jsJson.background_radius = pyJson.background_radius || 0;
  jsJson.video_src = pyJson.background_src || null;
  jsJson.video_size = [
    pyJson.background_size_w || 100,
    pyJson.background_size_h || 100
  ];
  console.log("jsJson", jsJson);
  return jsJson;
}
