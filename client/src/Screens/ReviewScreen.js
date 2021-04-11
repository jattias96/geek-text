import React, { useState, useEffect } from "react";

const ReviewScreen = ({}) => {

    return (
        <div>
        <h2>Review this book</h2>
                    <h3>Place a Rating</h3>
                    <div>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </div>
                    <div>
                      <h3>Place a Comment</h3>
                      <label>Enter your name here</label>
                      <input type="text" name="name" required />
                      <TextField
                        id="outlined-textarea"
                        placeholder="Leave your review here."
                        multiline
                        variant="outlined"
                        rows={5}
                        style={{
                          width: 800,
                        }}
                      />
                    </div>
                    <div>
                      <h3>Would you like to be anonymous?
                <Checkbox
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </h3>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          margin_left: 300
                        }}
                      >
                        Submit
</Button>
                    </div>
                    </div>
    )
}
