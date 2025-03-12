import React from 'react'
import Card from './Card';

const TopItems = () => {
  return (
    <div>
      <div className="w-full min-h-[150svh] relative">
        <div className="w-[90%] min-h-[80vh] absolute top-[15vh] left-1/2 transform -translate-x-1/2 rounded-xl">
          <h1 className="text-[4vw] text-center py-2">Signature Collection</h1>
          <div className="w-full h-[80%] grid grid-cols-3 items-center place-items-center gap-2 mt-[8vh] space-y-4">
            <Card image={"https://res.cloudinary.com/dnqfswchd/image/upload/v1741616982/45_aspect_ratio_image._Warm_candlelight_dramatic_cinematic_style._Stylish_male_model_medium_close-up_wearing_selected_clothing._Minimal_background_soft_even_lighting_emphasizing_texture_and_fit._Relaxed_pose_high-qua_su4ej9.jpg"}
            btnTxt={"Add to Cart"}
            price={"$100"}
            />
            <Card image={"https://res.cloudinary.com/dnqfswchd/image/upload/v1741616982/45_aspect_ratio_image._Warm_candlelight_dramatic_cinematic_style._Stylish_male_model_medium_close-up_wearing_selected_clothing._Minimal_background_soft_even_lighting_emphasizing_texture_and_fit._Relaxed_pose_high-qua_su4ej9.jpg"}
            btnTxt={"Add to Cart"}
            price={"$100"}
            />
            <Card image={"https://res.cloudinary.com/dnqfswchd/image/upload/v1741616982/45_aspect_ratio_image._Warm_candlelight_dramatic_cinematic_style._Stylish_male_model_medium_close-up_wearing_selected_clothing._Minimal_background_soft_even_lighting_emphasizing_texture_and_fit._Relaxed_pose_high-qua_su4ej9.jpg"}
            btnTxt={"Add to Cart"}
            price={"$100"}
            />
            
        </div>
      </div>
    </div>
    </div>
  )
}

export default TopItems