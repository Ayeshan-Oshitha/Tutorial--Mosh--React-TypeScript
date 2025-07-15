import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkelton = () => {
  return (
    <div>
      <Card>
        <Skeleton height="200px" />
        <CardBody>
          <SkeletonText />
        </CardBody>
      </Card>
    </div>
  );
};

export default GameCardSkelton;
