const MiniGames = require('../models/miniGames.schema');

// add new mini game
exports.addMiniGame = async (req, res) => {
  // test if category exists already -- todo
  try {
    const newMiniGame = new MiniGames({
      title: req.body.title,
      gameLink: req.body.gameLink,
      relatedCategories: req.body.relatedCategories,
      screenshot1_small: req.body.screenshot1_small,
      screenshot2_small: req.body.screenshot2_small,
      icon_large: req.body.icon_large,
      icon_small: req.body.icon_small,
      banner_large: req.body.banner_large,
      banner_medium: req.body.banner_medium,
      short_description: req.body.short_description,
      description: req.body.description,
      icon: req.body.icon,
      studioName: req.body.studioName,
    });
    const miniGame = await newMiniGame.save();
    console.log('Mini Game added successfully ! ', miniGame);
    res.status(201).json({
      message: 'Mini Game added successfully ! ',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// retrieve all mini games from database
exports.allMiniGames = async (req, res) => {
  MiniGames.find()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Mini Games.',
      });
    });
};

// Update a mini game record
exports.updateOneMiniGame = async (req, res) => {
  try {
    const miniGame = req.body;
    const miniGame_id = req.params.id;

    const mini_game = await MiniGames.findById(miniGame_id);
    if (!mini_game)
      res.status(404).json({ message: "Failure", data: { errorMessage: "This mini game does not exist!" } });
    else {
      const updatedMiniGame = await MiniGames.findByIdAndUpdate(miniGame_id, miniGame, { new: true });
      res.status(200).json({ message: "Success", data: updatedMiniGame });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failure", data: { errorMessage: "Internal server error!" } });
  }
}

// update mini game by kind
exports.updateMiniGamesByKind = async (req, res) => {
  try {
    const { icon, kind } = req.body;
    await MiniGames.updateMany({ "kind": kind }, { "$set": { "icon": icon } })
    res.status(200).json({ message: "Success", data: "Mini Games updated successfully !" });

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failure", data: { errorMessage: "Internal server error!" } });
  }
}

// delete a mini game
exports.deleteOneMiniGame = async (req, res) => {
  const { id } = req.params;
  const foundMiniGame = await MiniGames.findOne({ _id: id });
  if (foundMiniGame || foundMiniGame.length == 0) {
    const response = await foundMiniGame.deleteOne({ _id: id });
    res.status(202).json(response);
  } else {
    res.status(404).json({ message: `Mini game not found...` });
  }
};

// get  one game by ID
exports.findGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const gameExists = await MiniGames.findOne({ _id: id });
    if (!gameExists) res.status(401).json('No game with such an ID');
    res.status(200).json({ message: 'Game found : ', gameExists });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error .',
      error,
    });
  }
};

// Get mini games filtred by kinds
exports.allMiniGamesByKinds = async (req, res) => {
  try {
    let kinds = [];
    kinds = req.body.kinds;
    // kinds = kinds.map((kind) => kind.charAt(0).toUpperCase() + kind.slice(1).toLowerCase());

    let allMiniGames = {};

    if (kinds.length === 0) {
      allMiniGames = await MiniGames.find();
    } else {
      allMiniGames = await MiniGames.find({
        kind: { $in: kinds }
      });
    }

    res.status(200).json({ message: "Success", data: allMiniGames });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failure",
      data: { errorMessage: "Internal server error!" },
    });
  }
};

// get All categories names and icons
exports.getKindsNamesAndIcons = async (req, res) => {
  try {
    const allKinds = await MiniGames.distinct("kind");
    const kinds = allKinds.filter((kind, index) => {
      return !(kind === "Word" || kind === "Match 3" || kind === "Platformer")
    })
    let games = [];
    const result = await Promise.all(kinds.map(async (k) => {
      const g = await MiniGames.findOne({ kind: k }, { kind: 1, icon: 1 })
      games.push(g);
    }))
    res.status(200).json({ message: "Success", data: games });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failure",
      data: { errorMessage: "Internal server error!" },
    });
  }
}
