/**
 * Chuyển chuỗi tiếng Việt thành slug (chữ thường, không dấu, nối bằng -).
 */
export function slugify(text: string): string {
  const from =
    "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ";
  const to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYD";
  let result = text.trim().toLowerCase();
  for (let i = 0; i < from.length; i++) {
    result = result.replaceAll(from[i], to[i]);
  }
  result = result.replace(/[^a-z0-9\s-]/g, "");
  result = result.replace(/\s+/g, "-").replace(/-+/g, "-");
  return result.replace(/^-|-$/g, "");
}
