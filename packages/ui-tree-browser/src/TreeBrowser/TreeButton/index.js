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
import classnames from 'classnames'

import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { isIE11 } from '@instructure/ui-utils'
import { Img } from '@instructure/ui-img'
import {
  callRenderProp,
  getElementType,
  safeCloneElement
} from '@instructure/ui-react-utils'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TreeBrowser
---
**/

@testable()
@themeable(theme, styles)
class TreeButton extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    descriptor: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    collectionIconExpanded: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]),
    itemIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    thumbnail: PropTypes.string,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    selected: PropTypes.bool,
    focused: PropTypes.bool,
    as: PropTypes.elementType,
    children: PropTypes.node,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    as: 'button',
    type: 'treeButton',
    size: 'medium',
    variant: 'folderTree',
    selected: false,
    focused: false,
    onClick: function () {},
    id: undefined,
    name: undefined,
    collectionIcon: undefined,
    collectionIconExpanded: undefined,
    itemIcon: undefined,
    thumbnail: undefined,
    expanded: false,
    descriptor: undefined,
    onBlur: function () {},
    children: undefined
  }

  renderImage() {
    const { type } = this.props
    switch (type) {
      case 'collection':
        return this.renderCollectionIcon()
      case 'item':
        return this.renderItemImage()
      default:
        break
    }
  }

  renderCollectionIcon() {
    const { expanded, collectionIcon, collectionIconExpanded } = this.props

    if (collectionIcon || collectionIconExpanded) {
      return (
        <div className={styles.icon}>
          {callRenderProp(expanded ? collectionIconExpanded : collectionIcon)}
        </div>
      )
    }
  }

  renderItemImage() {
    const { thumbnail, itemIcon } = this.props
    if (thumbnail) {
      return (
        <div className={styles.thumbnail}>
          <Img src={thumbnail} constrain="cover" alt="" />
        </div>
      )
    }

    if (itemIcon) {
      return <div className={styles.icon}>{callRenderProp(itemIcon)}</div>
    }
  }

  render() {
    const {
      name,
      descriptor,
      expanded,
      selected,
      focused,
      variant,
      size,
      children,
      onBlur
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.expanded]: expanded,
      [styles.selected]: selected,
      [styles.focused]: focused,
      [styles.ie11]: isIE11
    }
    const ElementType = getElementType(TreeButton, this.props)

    // VoiceOver can't navigate without the buttons, even though they don't do anything
    return (
      <ElementType tabIndex={-1} className={classnames(classes)}>
        <span className={styles.layout}>
          {this.renderImage()}
          <span className={styles.text}>
            <span className={styles.textName}>{name}</span>
            {descriptor ? (
              <span className={styles.textDescriptor} title={descriptor}>
                {descriptor}
              </span>
            ) : null}
            {children && safeCloneElement(children, { onBlur: onBlur })}
          </span>
        </span>
      </ElementType>
    )
  }
}

export default TreeButton
export { TreeButton }
