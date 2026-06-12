const Mentor = require("../models/mentorData");

const cloudinary = require("../dbConnector/cloudanairy");

const createMentor = async (req, res) => {
  try {
    const mentorData = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Mentor image is required",
      });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "mentor_images",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    mentorData.image = uploadResult.secure_url;
    mentorData.imagePublicId = uploadResult.public_id;

    const mentor = await Mentor.create(mentorData);

    res.status(201).json({
      message: "Mentor created successfully",
      data: mentor,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in creating mentor",
      error: err.message,
    });
  }
};

const getAllMentor = async (req, res) => {
    try {
        const mentorData = await Mentor.find();
        res.status(200).send(mentorData)
    }
    catch (err) {
        res.status(404).send("Error in the fetching data " + err.message)
    }

}

const deleteMentor = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        if (!id) {
            res.status(500).send("Id does not exist in the delete ")
        }
        const mentorData = await Mentor.findByIdAndDelete(id);

        res.status(200).send("Mentor deleted sucessfully");
    }
    catch (err) {
        res.status(404).send("Error in Delete Section " + err.message);
    }
}


module.exports = { createMentor, deleteMentor, getAllMentor };
