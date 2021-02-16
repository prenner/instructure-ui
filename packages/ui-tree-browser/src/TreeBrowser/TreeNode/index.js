/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 - present Instructure, Inc.
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

import styles from '../TreeButton/styles.css'
import theme from '../TreeButton/theme'

/**
---
parent: TreeBrowser
id: TreeNode
---
**/

@testable()
@themeable(theme, styles)
class TreeNode extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    selected: PropTypes.bool,
    focused: PropTypes.bool,
    /**
     * The children to be rendered within the `<TreeNode />`
     */
    children: PropTypes.node,
    /**
     *
     * A function that returns a reference to the parent element
     */
    containerRef: PropTypes.func
  }

  static defaultProps = {
    id: undefined,
    size: 'medium',
    variant: 'folderTree',
    selected: false,
    focused: false,
    children: undefined,
    containerRef: function () {},
    parentRef: undefined
  }

  handleRef = (el) => {
    el && this.props.containerRef(el.parentElement)
  }

  render() {
    const { selected, focused, variant, size, children } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.expanded]: false,
      [styles.selected]: selected,
      [styles.focused]: focused,
      [styles.ie11]: isIE11,
      [styles.node]: true
    }

    return (
      <div ref={this.handleRef} tabIndex="-1" className={classnames(classes)}>
        {children}
      </div>
    )
  }
}

export default TreeNode
export { TreeNode }
