#import "RNSearchBar.h"

#import "UIView+React.h"
#import "RCTEventDispatcher.h"

@interface RNSearchBar() <UISearchBarDelegate>

@end

@implementation RNSearchBar
{
  RCTEventDispatcher *_eventDispatcher;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
  if ((self = [super initWithFrame:CGRectMake(0, 0, 1000, 44)])) {
    _eventDispatcher = eventDispatcher;
    self.delegate = self;
  }
  return self;
}


- (void)searchBarTextDidBeginEditing:(UISearchBar *)searchBar
{
  [self setShowsCancelButton:YES animated:YES];
  
  [_eventDispatcher sendTextEventWithType:RCTTextEventTypeFocus
                                 reactTag:self.reactTag
                                     text:searchBar.text];
}

- (void)searchBar:(UISearchBar *)searchBar textDidChange:(NSString *)searchText
{
  [_eventDispatcher sendTextEventWithType:RCTTextEventTypeChange
                                 reactTag:self.reactTag
                                     text:searchText];
}

- (void)searchBarSearchButtonClicked:(UISearchBar *)searchBar
{
  NSDictionary *event = @{
                          @"target": self.reactTag,
                          @"button": @"search",
                          @"searchText": searchBar.text
                          };
  
  [_eventDispatcher sendInputEventWithName:@"topTap" body:event];
}


- (void)searchBarCancelButtonClicked:(UISearchBar *)searchBar
{
  self.text = @"";
  [self resignFirstResponder];
  [self setShowsCancelButton:NO animated:YES];
  
  NSDictionary *event = @{
                          @"target": self.reactTag,
                          @"button": @"cancel"
                          };
  
  [_eventDispatcher sendInputEventWithName:@"topTap" body:event];
}


@end
