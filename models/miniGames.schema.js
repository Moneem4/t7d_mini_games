const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const miniGamesSchema = new Schema(
  {
    gameLink: [
      {
        type: String,
        required: false,
      },
    ],
    images: [
      {
        type: String,
        required: false,
      },
    ],
    relatedCats: [
      {
        type: String,
        required: false,
      },
    ],
    comments: [
      {
        type: String,
        required: false,
      },
    ],
    screenshot1_small: {
      type: String,
      required: false,
    },
    screenshot2_small: {
      type: String,
      required: false,
    },
    icon_large: {
      type: String,
      required: false,
    },
    icon_medium: {
      type: String,
      required: false,
    },
    icon_small: {
      type: String,
      required: false,
    },
    banner_large: {
      type: String,
      required: false,
    },
    banner_medium: {
      type: String,
      required: false,
    },
    banner_small: {
      type: String,
      required: false,
    },
    screenshot3_small: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    date_added: {
      type: Date,
    },
    short_description: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    kind: {
      type: String,
      required: false,
    },
    studioName: {
      type: String,
      default: 'OMG',
    },
    // title: {
    //   type: String,
    //   required: false,
    // },
    // gameLink: {
    //   type: String,
    //   required: false,
    // },
    // relatedCategories: [
    //   {
    //     ref: 'Category',
    //     type: String,
    //     required: false,
    //   },
    // ],
    // screenshot1_small: {
    //   type: String,
    //   required: false,
    // },
    // screenshot2_small: {
    //   type: String,
    //   required: false,
    // },
    // icon_large: {
    //   type: String,
    //   required: false,
    // },
    // icon_small: {
    //   type: String,
    //   required: false,
    // },
    // banner_large: {
    //   type: String,
    //   required: false,
    // },
    // banner_medium: {
    //   type: String,
    //   required: false,
    // },
    // short_description: {
    //   type: String,
    //   required: false,
    // },
    // description: {
    //   type: String,
    //   required: false,
    // },
    // icon: {
    //   type: String,
    //   default: 'mini game icon',
    // },
    // studioName: {
    //   type: String,
    //   default: 'Studio name',
    // },
  },
  { timestamps: true }
);

function arrayLimit(limit) {
  return limit.length <= 5;
}

module.exports = MiniGames = mongoose.model('MiniGames', miniGamesSchema);
