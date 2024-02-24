const { HttpError, ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');
const { deleteImage } = require('../../service/imageService');

const updateGoods = async (req, res) => {
  const { id } = req.params;

  const newMainPhoto = req.files?.img || null;
  const newExtraPhotos = req.files?.extraPhotos || null;

  const oldExtraPhotos = req.body?.oldExtraPhotos || null;

  const result = await Goods.findById(id);
  const currentExtraPhotos = result?.extraPhotos || null;
  console.log(req.body);

  if (oldExtraPhotos) {
    if (typeof oldExtraPhotos === 'string') {
      const findIdIMageToDeletteBySting = oldId => {
        return currentExtraPhotos
          .filter(({ id }) => id !== oldId)
          .map(({ id }) => id);
      };
      console.log(findIdIMageToDeletteBySting(oldExtraPhotos));
    } else {
      const findIdIMageToDeletteByArray = (arr1, arr2) => {
        return arr1.filter(obj => !arr2.includes(obj.id)).map(({ id }) => id);
      };

      console.log(
        findIdIMageToDeletteByArray(currentExtraPhotos, oldExtraPhotos)
      );
    }
  }

  // const result = await Goods.findByIdAndUpdate(id, req.body, {
  //   new: true,
  // });

  // if (!result) {
  //   throw HttpError(404, 'Not found');
  // }

  // res.json(result);
};

module.exports = {
  updateGoods: ctrlWrapper(updateGoods),
};
