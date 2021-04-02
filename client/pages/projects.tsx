import Img from 'next/image';
import React from 'react';
import { FlipCard, FlipCardProps } from '../components/FlipCard';
import { FlipCardBack } from '../components/FlipCardBack';
import { FlipCardFront } from '../components/FlipCardFront';
import { Layout } from '../components/Layout';

const projectProps: FlipCardProps = {
    w: "200px",
    h: "200px",
    m: "100px",
    borderRadius: "25px",
    doesFlipOnHover: true,
    flipDuration: 1.5,
}

const Projects = () => (
    <Layout>
        <FlipCard {...projectProps}>
            <FlipCardFront bgColor="yellow"></FlipCardFront>
            <FlipCardBack bgColor="red">Apple</FlipCardBack>
        </FlipCard>
        <FlipCard {...projectProps}>
            <FlipCardFront bgColor="yellow"></FlipCardFront>
            <FlipCardBack bgColor="red">Apple</FlipCardBack>
        </FlipCard>
        <Img src="/static/css.png" height={48} width={48}></Img>
    </Layout>
);

export default Projects;