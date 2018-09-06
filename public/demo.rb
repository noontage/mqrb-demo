#
# = j (JavaScriptObject)
#
def j
  JavaScriptObject.new
end

#
# = apply_image_filter
#
def apply_image_filter(type, val)
  val = val.to_i
  unless (val.between?(0, 100))
    j.alert "Invalid Value"
    return
  end

  case (type)
  when "Grayscale"
    filter = "grayscale(#{val}%)"
  when "Sepia"
    filter = "sepia(#{val}%)"
  when "Saturate"
    filter = "saturate(#{val}%)"
  else
    j.alert "Unknown Filter type"
  end

  if (@el_blur.checked._val)
    filter += " blur(4px)"
  end

  @el_image.style.filter = filter
end

#
# = main
#
def main
  # Get elements
  @el_image = j.document.getElementById("sample-image")
  @el_select = j.document.getElementById("sample-select")
  @el_number = j.document.getElementById("sample-input-number")
  @el_button = j.document.getElementById("sample-button-apply")
  @el_button_clear = j.document.getElementById("sample-button-clear")
  @el_blur = j.document.getElementById("sample-checkbox")
  @el_text = j.document.getElementById("sample-text")

  # add event listenr[Apply Button]
  @el_button.addEventListener("click", -> event {
    value = @el_number.value._val # NOTE: '_val' methods is convert that value of Javascript to value of Ruby
    apply_image_filter(@el_select.value._val, value)
  }, false)

  # add event listenr [Clear Button]
  @el_button_clear.addEventListener("click", -> event {
    @el_image.style.filter = ""
    j.setTimeout(-> {
      j.alert "Cleard filter!"
    }, 100)
  }, false)

  # caption
  @el_text.textContent = "Hi Ruby! Welcome to browser!"
end

main
