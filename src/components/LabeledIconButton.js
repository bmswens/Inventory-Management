// React
import React from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material'


function LabeledIconButton(props) {
    const {
        onClick,
        label,
        disabled
    } = props

    return (
        <Tooltip
            title={label}
        >
            <span>
                <IconButton
                    disabled={disabled}
                    onClick={onClick}
                >
                    {props.children}
                </IconButton>
            </span>
        </Tooltip>
    )
}

export default LabeledIconButton