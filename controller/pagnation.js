const NewsModel = require("../model/blackcoffer")

const pagination = async (req, res) => {
    try {
        const { search, limit=10, skip=0, end_year, region, topic, country, insight } = req.body
        let query = []


        if (search !== "") {
            query.push({
                $match: {
                    $or: [
                        {
                            end_year: {
                                $regex: search + '.*',
                                $options: 'si'
                            },
                            topic: {
                                $regex: search + '.*',
                                $options: 'si'
                            },
                            region: {
                                $regex: search + '.*',
                                $options: 'si'
                            },
                            country: {
                                $regex: search + '.*',
                                $options: 'si'
                            },
                            insight: {
                                $regex: search + '.*',
                                $options: 'si'
                            },
                        }

                    ]
                }
            });
        }


        if (end_year !== "") {
            query.push({
                $match: { end_year: parseInt(end_year)}
            })
        }

        if (topic !== "") {
            query.push({
                $match: { topic: topic }
            });
        }


        if (region !== "") {
            query.push({
                $match: { region: region }
            });
        }

        if (country !== "") {
            query.push({
                $match: { country: country }
            });
        }

        if (insight !== "") {
            query.push({
                $match: { insight: insight }
            });
        }



        const withoutlimit = Object.assign([], query)
        withoutlimit.push({ $count: 'count' })

        query.push(
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    topic: 1,
                    insight: 1,
                    region: 1,
                    country: 1,
                    end_year: 1



                }
            }
        )

        const finalquery = [
            {
                $facet: {
                    overall: withoutlimit,
                    documentdata: query
                }
            }
        ]

        const getAlldata = await NewsModel.aggregate(finalquery)
        const data = getAlldata[0].documentdata
        const fullCount = getAlldata[0]?.overall[0]?.count

        if (data.length > 0) {
            res.json({
                status: 1,
                response: {
                    result: data,
                    fullcount: fullCount,
                    length: data.length
                }
            })
        } else {
            res.json({
                status: 0,
                response: {
                    result: [],
                    fullcount: fullCount,
                    length: data.length
                }
            })
        }

    } catch (error) {
        console.log(error)
    }

}
module.exports = { pagination }