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

import ComponentIdentifier, { pick } from '@instructure/ui-utils/lib/react/ComponentIdentifier'
import deprecated, { changedPackageWarning } from '@instructure/ui-utils/lib/react/deprecated'

import UIPopover from '@instructure/ui-overlays/lib/components/Popover'

@deprecated('5.0.0', null, changedPackageWarning(
  'ui-core',
  'ui-overlays'
))
class Popover extends Component {
  static propTypes = {
    ...UIPopover.PropTypes
  }

  render () {
    return <UIPopover {...this.props} />
  }
}

@deprecated('5.0.0', null, changedPackageWarning(
  'ui-core',
  'ui-overlays'
))
class PopoverTrigger extends ComponentIdentifier {
  static displayName = 'PopoverTrigger'
}

@deprecated('5.0.0', null, changedPackageWarning(
  'ui-core',
  'ui-overlays'
))
class PopoverContent extends ComponentIdentifier {
  static displayName = 'PopoverContent'
}

export default Popover
export { PopoverTrigger, PopoverContent }
