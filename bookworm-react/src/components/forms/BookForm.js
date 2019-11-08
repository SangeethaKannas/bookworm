import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Label, Image, Segment, Grid } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'

class BookForm extends React.Component {
    state = {
        data: {          
            goodreadsId: this.props.book.goodreadsId,
            title: this.props.book.title,
            author: this.props.book.author,
            cover: this.props.book.covers[0],
            pages: this.props.book.pages
        },
        covers: this.props.book.covers,
        index: 0,
        loading: false,
        errors: {}
    }

    componentWillReceiveProps(props) {
         this.setState({    
            data : {
                goodreadsId: props.book.goodreadsId,
                title: props.book.title,
                author: props.book.author,
                cover: props.book.covers[0],
                pages: props.book.pages
            },
            covers: this.props.book.covers,
         })
    }

    changeCover = () => {
        const { index, covers} = this.state
        const newIndex = index + 1 >= covers.length? 0 : index + 1
        this.setState( {
            index: newIndex,
            data: {
                ...this.state.data,
                cover: covers[newIndex]
            }
        })
    }

    onChange = (e) => {
        this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
    }

    onChangeNumber = (e) => {
        this.setState({data:{...this.state.data, [e.target.name]: parseInt( e.target.value, 10) }})
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data)
        
        this.setState({errors})
        
        if(Object.keys(errors).length === 0) {
            this.setState({ loading: true })
            this.props.submit(this.state.data)
            .catch( error => this.setState({ errors: error.response.data.errors, loading: false }))
        } else {
            //TODO: show global message for errors,   disable login button
            // console.log(errors)        
        }
    }

    validate = data => {
        const errors = {}
        if(!data.title) errors.title = 'Can"t be empty'
        if(!data.authors) errors.authors = 'Can"t be empty'
        if(!data.pages) errors.pages = 'Can"t be empty'
        return errors
    }

    render() {
        const { data, errors, loading } = this.state

        return (
            <Segment>
                <Form onSubmit={this.onSubmit} loading={loading}>
                    <Grid columns={2} fluid stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field error={!!errors.title}>
                                    <Label htmlFor="title">Title</Label>
                                    <input type="text" id="title" name="title"
                                    placeholder="Title"
                                    value={data.title}
                                    onchange={this.onChange}
                                    />
                                    {errors.title && <InlineError text={errors.title}/>}
                                </Form.Field>

                                <Form.Field error={!!errors.authors}>
                                    <Label htmlFor="author">Authors</Label>
                                    <input type="text" id="authors" name="authors"
                                    placeholder="Author"
                                    value={data.author}
                                    onchange={this.onChange}
                                    />
                                    {errors.author && <InlineError text={errors.author}/>}
                                </Form.Field>

                                <Form.Field error={!!errors.page}>
                                    <Label htmlFor="">Pages</Label>
                                    <input type="number" id="pages" name="pages"
                                    disabled={data.pages===undefined}
                                    placeholder="pages"
                                    value={data.pages !== undefined ? data.pages : "Loading"}
                                    onchange={this.onChangeNumber}
                                    />
                                    {errors.pages && <InlineError text={errors.pages}/>}
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Image size="small" src={data.cover} />
                                {
                                    this.state.covers.length > 1 && (
                                        <a role="button" tabIndex={0} onClick={this.changeCover}>
                                            Another Cover
                                        </a>
                                    )
                                }
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row>
                            <Button primary>Save</Button>
                        </Grid.Row>                        
                    </Grid>
                </Form>
            </Segment>
        )
    }
}

BookForm.propTypes = {
    submit: PropTypes.func.isRequired,
    book: PropTypes.shape({
        goodreadsId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        authors: PropTypes.string.isRequired,
        pages: PropTypes.number.isRequired
    }).isRequired
}

export default BookForm
