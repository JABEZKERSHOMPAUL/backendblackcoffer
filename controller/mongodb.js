
const DataModel = require('../model/blackcoffer');


const aggregateBlackoffer = async (req, res) => {
  try {
    const tablePipeline = [
      {
        $match: {
          $and: [
            { country: { $ne: "" } },
            { region: { $ne: "" } },
            { insight: { $ne: "" } },
            { start_year: { $ne: "" } },
            { topic: { $ne: "" } },
             { end_year: { $ne: "" } },
          ]
        }
      },
      {
        $project: {
          year: { $ifNull: ["$start_year", "$end_year"] },
          country: "$country",
          topic: "$topic",
          insight:"$insight",
          region:"$region"
        }
      }
    ]
    // Use the Mongoose model to find all documents in the collection
    const getAll = await DataModel.aggregate(tablePipeline);
    res.json({ status: 1, res: getAll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, error: "An error occurred" });
  }
};



const aggregateIntensity = async (req, res) => {
  try {
    const aggregationPipeline = [
      {
        $match: {
          $and: [
            { start_year: { $ne: "" } },
            { end_year: { $ne: "" } },
            { country: { $ne: "" } },
            { topic: { $ne: "" } }
          ]
        }
      },
      {
        $project: {
          year: { $ifNull: ["$start_year", "$end_year"] },
          country: "$country",
          topic: "$topic"
        }
      }
    ];
    
    const aggregatedData = await DataModel.aggregate(aggregationPipeline);

    res.json({ status: 1, res: aggregatedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, error: "An error occurred" });
  }
};


const aggregateIntensitysector = async (req, res) => {
  try {
    // Use the Mongoose model to perform aggregation
    const aggregationPipeline = [
      {
        $match: {
          $and: [
            { sector: { $ne: "" } },
            
          ]
        }
      },
      {
        $project: {
          intensity: 1,
          sector: 1,
        },
      },
      { $limit: 200 } 
    ];

    const aggregatedData = await DataModel.aggregate(aggregationPipeline);

    res.json({ status: 1, res: aggregatedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, error: "An error occurred" });
  }
};



const aggregateBubble = async (req, res) => {
  try {
    const aggregationPipeline = [
      {
        $match: {
          $and: [
            { sector: { $ne: "" } },
            { start_year: { $ne: "" } },
            { end_year: { $ne: "" } },
            { country: { $ne: "" } }
          ]
        }
      },
      {
        $project: {
          year: { $ifNull: ["$start_year", "$end_year"] },
          country: 1, // Include the 'country' field in the projection
          likelihood: 1, // Include the 'likelihood' field in the projection
          intensity: 1,
          sector: 1,
        },
      },
    ];

    const aggregatedData = await DataModel.aggregate(aggregationPipeline);

    res.json({ status: 1, res: aggregatedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, error: "An error occurred" });
  }
};






module.exports = { aggregateBlackoffer, aggregateIntensity,aggregateIntensitysector,aggregateBubble};
