
const movieListAggregation = async (req, res) => {
    console.log(req.body)
    try {
        const { search, limit, skip, end_year, sector } = req.body
        let query = []
        if (search !== "") {
            query.push({
                $match: {
                    $or: [
                        {
                            moviename: {
                                $regex: search + '.*',
                                $options: 'si'
                            }
                        },
                        {
                            directedby: {
                                $regex: search + '.*',
                                $options: 'si'
                            }
                        },
                        {
                            produced: {
                                $regex: search + '.*',
                                $options: 'si'
                            }
                        }
                    ]
                }
            })
            // const end_year = "2019"
            if (end_year !== "") {
                query.push({
                    $match: { end_year: end_year }
                });
            }

            // if (search !== "" || end_year !== "") {
            //     query.push({
            //         $match: { topic: "oil" }
            //     });
            // }
            if (sector !== "") {
                query.push({
                    $match: { sector: sector }
                });
            }


        }
        const withoutlimit = Object.assign([], query)
        withoutlimit.push({ $count: 'count' })

        query.push(
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    end_year: 1,
                    
                    sector: 1
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
