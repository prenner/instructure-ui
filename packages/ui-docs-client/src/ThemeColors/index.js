/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Heading, MetricsList, Text } from '@instructure/ui-elements'
import { Responsive, ContextView, View, Flex } from '@instructure/ui-layout'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { contrast } from '@instructure/ui-color-utils'

import { ColorSwatch } from '../ColorSwatch'
import { ColorCard } from '../ColorCard'
import { SimpleSelect } from '@instructure/ui-simple-select'

class ThemeColors extends Component {
  static propTypes = {
    colors: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    const first = props.colors[Object.keys(props.colors)[0]]
    this.state = {
      backgroundColor: '#FFFFFF',
      foregroundColor: first,
      contrastRatio: contrast('#FFFFFF', first).toFixed(2)
    }
  }

  renderColorCards () {
    const { colors } = this.props

    return (
      <Responsive
        query={{
          xsmall: { maxWidth: '23rem' },
          small: { minWidth: '23rem'},
          medium: { minWidth: '36rem'},
          large: { minWidth: '50rem' }
        }}
        props={{
          xsmall: { colWidth: `${100 / 1}%`, minimal: true },
          small: { colWidth: `${100 / 2}%`, minimal: true },
          medium: { colWidth: `${100 / 4}%`, minimal: false },
          large: { colWidth: `${100 / 5}%`, minimal: false }
        }}
        render={(props, matches) => {
          const cards = []
          Object.keys(colors).forEach((color, index) => {
            cards.push(
              <ColorCard hex={colors[color]} name={color} minimal={props.minimal} />
            )
          })
          return (
            <View as="div" padding="small">
              <Heading level="h4">theme palette</Heading>
              <Flex wrapItems>
                {React.Children.map(cards, (child) => (
                  <Flex.Item size={props.colWidth} padding="small xx-small">
                    {child}
                  </Flex.Item>
                ))}
              </Flex>
            </View>
          )
        }}
      />
    )
  }

  handleContrastChange = (value, which) => {
    let ratio
    if (which === 'background') {
      ratio = contrast(this.state.foregroundColor, value).toFixed(2)
      this.setState({
        backgroundColor: value,
        contrastRatio: ratio
      })
    } else {
      ratio = contrast(this.state.backgroundColor, value).toFixed(2)
      this.setState({
        foregroundColor: value,
        contrastRatio: ratio
      })
    }
  }

  renderContrastChecker () {
    const { colors } = this.props
    const { contrastRatio } = this.state
    const values = []
    const options = Object.keys(colors).map(color => {
      const val = colors[color]
      if (values.indexOf(val) === -1) {
        values.push(val)
        return (
          <SimpleSelect.Option key={color} id={val} value={val} renderBeforeLabel={() => (<ColorSwatch color={val} />)}>
            {color}
          </SimpleSelect.Option>
        )
      }
    })

    const ratio = `${contrastRatio}:1`
    const pass = <Text size="large" color="success">PASS</Text>
    const fail = <Text size="large" color="error">FAIL</Text>

    const normalWCAG = {
      canvascontrast: contrastRatio > 3.0,
      aa: contrastRatio > 4.5
    }

    return (
      <View as="div" padding="small small none">
        <Heading level="h4">contrast</Heading>
        <Flex as="div" margin="small 0" background="default" alignItems="center" wrapItems>
          <Flex.Item padding="small">
            <SimpleSelect
              name="color-1"
              defaultValue={this.state.backgroundColor}
              renderLabel="Background Color"
              renderBeforeInput={<ColorSwatch color={this.state.backgroundColor} />}
              onChange={(e, {value}) => this.handleContrastChange(value, 'background')}
            >
              {React.Children.map(options, option => option)}
            </SimpleSelect>
          </Flex.Item>
          <Flex.Item padding="small">
            <SimpleSelect
              name="color-2"
              defaultValue={this.state.foregroundColor}
              renderLabel="Foreground Color"
              renderBeforeInput={<ColorSwatch color={this.state.foregroundColor} />}
              onChange={(e, {value}) => this.handleContrastChange(value, 'foreground')}
            >
              {React.Children.map(options, option => option)}
            </SimpleSelect>
          </Flex.Item>
          {this.state.contrastRatio && (
            <Flex.Item padding="small">
              <ContextView padding="small" placement="center start">
                <MetricsList>
                  <MetricsList.Item
                    label={<div>Contrast Ratio</div>}
                    value={<Text size="large">{ratio}</Text>}
                  />
                  <MetricsList.Item
                    label={<div>Canvas 3:1</div>}
                    value={normalWCAG.canvascontrast ? pass : fail}
                  />
                  <MetricsList.Item
                    label={<div>WCAG AA</div>}
                    value={normalWCAG.aa ? pass : fail}
                  />
                </MetricsList>
              </ContextView>
            </Flex.Item>
          )}
        </Flex>
      </View>
    )
  }

  render () {
    return (
      <div>
        {this.renderColorCards()}
        {this.renderContrastChecker()}
      </div>
    )
  }
}

export default ThemeColors
export { ThemeColors }
