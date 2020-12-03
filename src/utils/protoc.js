// The data transformer for renderVisComp
export function transformData(pyJson) {
  console.log("pyJson", pyJson);
  let jsJson = {};
  jsJson.data = pyJson.data;
  jsJson.data_name = pyJson.name;
  jsJson.visualization = pyJson.vis_type;
  jsJson.duration = pyJson.duration;
  jsJson.enter_duration = pyJson.enter_duration;
  jsJson.leave_duration = pyJson.leave_duration;
  jsJson.position = pyJson.position;
  jsJson.size = pyJson.size;
  jsJson.color = pyJson.color_list;
  jsJson.font_color = pyJson.font_color;
  jsJson.font_size = pyJson.font_size;
  jsJson.background_fill = pyJson.hasOwnProperty("background_fill")
    ? pyJson.background_fill
    : "black";
  jsJson.background_opacity = pyJson.hasOwnProperty("background_opacity")
    ? pyJson.background_opacity
    : 0;
  jsJson.background_stroke = pyJson.hasOwnProperty("background_stroke")
    ? pyJson.background_stroke
    : "black";
  jsJson.background_stroke_opacity = pyJson.hasOwnProperty(
    "background_stroke_opacity"
  )
    ? pyJson.background_stroke_opacity
    : 0;
  jsJson.background_line_width = pyJson.hasOwnProperty("background_line_width")
    ? pyJson.background_line_width
    : 0;
  jsJson.background_radius = pyJson.hasOwnProperty("background_radius")
    ? pyJson.background_radius
    : 20;
  jsJson.video_src = pyJson.hasOwnProperty("video_src") ? pyJson.video_src : "";
  jsJson.video_size = pyJson.hasOwnProperty("video_size")
    ? pyJson.video_size
    : [0, 0];
  console.log("jsJson", jsJson);
  return jsJson;
}
