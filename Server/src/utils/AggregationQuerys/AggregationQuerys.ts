import { ObjectId } from "mongodb";

const AggregationQuery = {
    getProjectQuery: (projectId: any) => {
        if (typeof projectId !== "string" || !ObjectId.isValid(projectId)) {
            throw new Error("Invalid projectId format");
        }

        return [
            { $match: { _id: new ObjectId(projectId) } },
            {
                $lookup: {
                    from: "projects",
                    let: {
                        currentUserId: "$userId",
                        currentTechUsed: "$techUsed",
                        currentCategory: "$category"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ["$userId", "$$currentUserId"] },
                                        { $eq: ["$category", "$$currentCategory"] },
                                        {
                                            $gt: [
                                                {
                                                    $size: {
                                                        $setIntersection: ["$techUsed", "$$currentTechUsed"]
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    ]
                                }
                            }
                        },
                        { $limit: 10 }
                    ],
                    as: "similarProjects"
                }
            }
        ];
    },
};

export default AggregationQuery;
