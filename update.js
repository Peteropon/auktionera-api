import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      auctionId: event.pathParameters.id,
    },
    UpdateExpression:
      "SET title = :title, description = :description, startPrice = :startPrice, attachment = :attachment",
    ExpressionAttributeValues: {
      ":title": data.title || null,
      ":description": data.description || null,
      ":startPrice": data.startPrice || null,
      ":attachment": data.attachment || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
