
import { useState } from 'react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import {
    Star,
    Calendar as CalendarIcon,
    Heart,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';
import { usePost } from '../../hooks/usePost';
import { usePatch } from '../../hooks/usePatch';

const ReviewLayout = ({ resortId }) => {
    const { data: feedbacks, loading: feedbacksLoading, refetch: feedbacksRefetch } = useGet(`/feedback/${resortId}/resort`)
    const { data: stars, loading: starsLoading, refetch: starsRefetch } = useGet(`/feedback/${resortId}/stars`)
    const { data: user, loading: userLoading } = useGet('/user/profile')
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [editingFeedbackId, setEditingFeedbackId] = useState(null);
    const [editRating, setEditRating] = useState(0);
    const [editComment, setEditComment] = useState('');

    const { postData, error: postError } = usePost()
    const { patchData } = usePatch()


    const writeFeedback = async () => {
        if (rating === 0 || comment === '') {
            alert('Missing Field')
            return
        }
        try {
            const res = await postData('/feedback', {
                resortId: resortId,
                rating: rating,
                comment: comment
            })
            if (res) {
                feedbacksRefetch()
                starsRefetch()
                setRating(0)
                setComment('')
            } else {
                setRating(0)
                setComment('')
                alert('You need to booking before leave a review!')
                return
            }
        } catch (err) {
            alert(`Error ${postError}`)
        }
    };

    const editFeedback = async () => {
        if (editRating === 0 || editComment === '') {
            alert('Missing Field')
            return
        }
        try {
            const res = await patchData('/feedback/edit', {
                feedbackId: editingFeedbackId,
                rating: editRating,
                comment: editComment
            })
            if (res) {
                setEditingFeedbackId(null)
                feedbacksRefetch()
                starsRefetch()
            }
        } catch (err) {
            alert(`Error: ${err}`)
        }
    }

    const handleEditFeedback = (feedback) => {
        setEditingFeedbackId(feedback._id)
        setEditRating(feedback.rating);
        setEditComment(feedback.comment);
    }


    if (feedbacksLoading || userLoading || starsLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            {user && (
                <div className="mt-10">
                    <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        Write a Review...
                    </h3>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Your Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 cursor-pointer ${rating >= star ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-gray-300'
                                        }`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Your Comment</label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience..."
                        />
                    </div>
                    <Button onClick={writeFeedback} className="cursor-pointer">Submit Review</Button>
                </div>
            )}

            <div className="flex items-center gap-3 mb-6 mt-10">
                <h2 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                    Guest Reviews
                </h2>
                <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-xl">{stars.averageRating}</span>
                    <span className="text-gray-500">({stars.totalFeedbacks} reviews)</span>
                </div>
            </div>

            {feedbacks.length > 0 ? (
                <div className="space-y-6">
                    {feedbacks.map((review) => (
                        <>
                            <Card key={review._id} className="p-6">
                                <div className="flex items-start gap-4">
                                    <img
                                        src={review.userId.userImg}
                                        alt={review.userId.userName}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 style={{ fontFamily: 'var(--font-serif)' }}>{review.userId.userName}</h4>
                                            <div className='flex flex-col justify-between '>
                                                <span className="text-sm text-gray-500">{review.createAt}</span>
                                                {user._id === review.userId._id && (
                                                    <div className='text-end text-gray-500 underline cursor-pointer'
                                                        onClick={() => handleEditFeedback(review)}
                                                    >
                                                        Edit
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mb-3">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                                            ))}
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                </div>
                            </Card>
                            {editingFeedbackId === review._id && (
                                <div className="mt-4">
                                    <div className="mb-2">
                                        <label className="block mb-1 text-sm text-gray-600">Edit Rating</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-5 h-5 cursor-pointer ${editRating >= star ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-gray-300'}`}
                                                    onClick={() => setEditRating(star)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <label className="block mb-1 text-sm text-gray-600">Edit Comment</label>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            rows={3}
                                            value={editComment}
                                            onChange={(e) => setEditComment(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={editFeedback}>Save</Button>
                                        <Button variant="outline" onClick={() => setEditingFeedbackId(null)}>Cancel</Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </div>
            ) : (
                <div>No Review Yet...</div>
            )}
        </div>
    )
}

export default ReviewLayout