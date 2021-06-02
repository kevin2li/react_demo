import React from 'react';
import {Button } from 'antd';

class Paper extends React.Component {

    render() {
        return (
            <>
                <Button type="link" href='http://www.baidu.com'>[1]付章杰,李恩露,程旭,黄永峰,胡雨婷.基于深度学习的图像隐写研究进展[J].计算机研究与发展,2021,58(03):548-568.</Button><br />
                <Button type="link" href='http://www.baidu.com'>[2]陈君夫,付章杰,张卫明,程旭,孙星明.基于深度学习的图像隐写分析综述[J].软件学报,2021,32(02):551-578.</Button><br />
                <Button type="link" href='http://www.baidu.com'>[3]付章杰,王帆,孙星明,王彦.基于深度学习的图像隐写方法研究[J].计算机学报,2020,43(09):1656-1672.</Button>
            </>
        )
    }
}

export default Paper
